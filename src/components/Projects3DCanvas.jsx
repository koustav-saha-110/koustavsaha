import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
import { useTheme } from "../hooks/useTheme";

const coreVertexShader = `
    uniform float uTime;
    varying float vDisplacement;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Simplex 3D Noise by Ashima Arts / Ian McEwan
    vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

    float snoise(vec3 v){
      const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
      const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy) );
      vec3 x0 =   v - i + dot(i, C.xxx) ;

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min( g.xyz, l.zxy );
      vec3 i2 = max( g.xyz, l.zxy );

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - D.xxx;

      i = mod(i, 289.0 );
      vec4 p = permute( permute( permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

      float n_ = 0.142857142857;
      vec3  ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z *ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_ );

      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4( x.xy, y.xy );
      vec4 b1 = vec4( x.zw, y.zw );

      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

      vec3 p0 = vec3(a0.xy,h.x);
      vec3 p1 = vec3(a0.zw,h.y);
      vec3 p2 = vec3(a1.xy,h.z);
      vec3 p3 = vec3(a1.zw,h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                    dot(p2,x2), dot(p3,x3) ) );
    }

    void main() {
        vNormal = normalize(normalMatrix * normal);
        
        // Deform inner core geometry using simplex noise
        float displacement = snoise(position * 2.2 + vec3(0.0, 0.0, uTime * 0.85));
        vDisplacement = displacement;

        vec3 newPosition = position + normal * displacement * 0.18;

        vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const coreFragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vDisplacement;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Iridescent color shift function based on view angle and depth
    vec3 getIridescence(vec3 normal, vec3 viewDir) {
        float cosTheta = dot(normal, viewDir);
        float rim = 1.0 - max(cosTheta, 0.0);
        
        // Create RGB shift cycles
        float r = sin(rim * 3.1415 + 0.0) * 0.5 + 0.5;
        float g = sin(rim * 3.1415 + 2.09) * 0.5 + 0.5;
        float b = sin(rim * 3.1415 + 4.18) * 0.5 + 0.5;
        
        return vec3(r, g, b);
    }

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);

        // Fresnel outline rim glow
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.2);

        // Mix gradient based on displacement
        float mixRatio = vDisplacement * 0.5 + 0.5;
        vec3 baseColor = mix(uColorA, uColorB, mixRatio);

        // Blend with 30% iridescence
        vec3 iridescent = getIridescence(normal, viewDir);
        vec3 finalColor = mix(baseColor, iridescent, 0.3);

        // Specular glow highlight additions
        finalColor += vec3(fresnel * 0.7);

        gl_FragColor = vec4(finalColor, 0.85);
    }
`;

const hullVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const hullFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
        // Neon pulse cycle scanning the hull grid
        float scan = sin(vUv.x * 12.0 - uTime * 2.8) * 0.5 + 0.5;
        scan = pow(scan, 3.5);

        vec3 color = mix(uColor, vec3(0.08, 0.82, 0.92), scan * 0.5);
        float alpha = 0.2 + scan * 0.55;

        gl_FragColor = vec4(color, alpha);
    }
`;

function CrystalCore({ activeColor }) {
    const hullRef = useRef();
    const coreRef = useRef();

    const coreMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: coreVertexShader,
            fragmentShader: coreFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColorA: { value: new THREE.Color(activeColor) },
                uColorB: { value: new THREE.Color("#6366f1") },
            },
            transparent: true,
            depthWrite: false,
        });
    }, []);

    const hullMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: hullVertexShader,
            fragmentShader: hullFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(activeColor) }
            },
            transparent: true,
            depthWrite: false,
            wireframe: true,
        });
    }, []);

    useEffect(() => {
        const colorA = new THREE.Color(activeColor);
        coreMaterial.uniforms.uColorA.value.copy(colorA);
        hullMaterial.uniforms.uColor.value.copy(colorA);

        const colorB = colorA.clone();
        const hsl = { h: 0, s: 0, l: 0 };
        colorB.getHSL(hsl);
        colorB.setHSL((hsl.h + 0.097) % 1.0, hsl.s, hsl.l);
        coreMaterial.uniforms.uColorB.value.copy(colorB);
    }, [activeColor, coreMaterial, hullMaterial]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        coreMaterial.uniforms.uTime.value = time;
        hullMaterial.uniforms.uTime.value = time;

        if (hullRef.current) {
            hullRef.current.rotation.y = time * 0.12;
            hullRef.current.rotation.x = time * 0.07;
        }

        if (coreRef.current) {
            coreRef.current.rotation.y = -time * 0.22;
            coreRef.current.rotation.x = -time * 0.09;
        }
    });

    return (
        <group>
            <mesh ref={hullRef}>
                <dodecahedronGeometry args={[1.05, 0]} />
                <primitive object={hullMaterial} attach="material" />
            </mesh>

            <mesh ref={coreRef}>
                <icosahedronGeometry args={[0.62, 4]} />
                <primitive object={coreMaterial} attach="material" />
            </mesh>
        </group>
    );
}

export default function Projects3DCanvas() {
    const { theme } = useTheme();
    const activeColor = theme === "dark" ? "#3b82f6" : "#2563eb";

    return (
        <div
            className="w-full h-48 md:h-56 relative z-10 overflow-hidden"
            data-testid="projects-3d-canvas"
        >
            <Canvas camera={{ position: [0, 0, 2.6], fov: 50 }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[5, 10, 5]} intensity={1.8} />
                <directionalLight position={[-5, -5, -5]} intensity={1} color={activeColor} />

                <CrystalCore activeColor={activeColor} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
