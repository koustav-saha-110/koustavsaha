import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
    uniform float uTime;
    uniform float uNoiseFrequency;
    uniform float uNoiseAmplitude;
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
        
        // Deform coordinates along normals
        float displacement = snoise(position * uNoiseFrequency + vec3(0.0, 0.0, uTime * 0.45));
        vDisplacement = displacement;
        
        vec3 displacedPosition = position + normal * displacement * uNoiseAmplitude;
        
        vec4 modelViewPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
        vViewPosition = -modelViewPosition.xyz;
        
        gl_Position = projectionMatrix * modelViewPosition;
    }
`;

const fragmentShader = `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    varying float vDisplacement;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    // Iridescent color shift function based on view angle and depth
    vec3 getIridescence(vec3 normal, vec3 viewDir) {
        float cosTheta = dot(normal, viewDir);
        float rim = 1.0 - max(cosTheta, 0.0);
        
        // Create RGB shift offset cycles
        float r = sin(rim * 3.1415 + 0.0) * 0.5 + 0.5;
        float g = sin(rim * 3.1415 + 2.09) * 0.5 + 0.5;
        float b = sin(rim * 3.1415 + 4.18) * 0.5 + 0.5;
        
        return vec3(r, g, b);
    }

    void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewDir = normalize(vViewPosition);
        
        // Fresnel lighting for edge glow
        float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.5);
        
        // Mix two gradient colors based on noise displacement height
        float mixRatio = vDisplacement * 0.5 + 0.5;
        vec3 baseColor = mix(uColorA, uColorB, mixRatio);
        
        // Calculate iridescent oil-slick highlight colors
        vec3 iridescent = getIridescence(normal, viewDir);
        
        // Blend theme base colors with 25% iridescent sheen
        vec3 finalColor = mix(baseColor, iridescent, 0.25);
        
        // Add specular glowing highlights
        finalColor += vec3(fresnel * 0.55);
        
        gl_FragColor = vec4(finalColor, 0.85);
    }
`;

function BlobMesh() {
    const meshRef = useRef();
    const { viewport } = useThree();

    const shaderMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uNoiseFrequency: { value: 1.4 },
                uNoiseAmplitude: { value: 0.22 },
                uColorA: { value: new THREE.Color("#3B82F6") },
                uColorB: { value: new THREE.Color("#6366F1") },
            },
            transparent: true,
            depthWrite: false,
        });
    }, []);

    useFrame((state) => {
        const { clock } = state;
        const elapsedTime = clock.getElapsedTime();

        if (meshRef.current) {
            meshRef.current.rotation.y = elapsedTime * 0.08;
            meshRef.current.rotation.x = elapsedTime * 0.05;
        }

        shaderMaterial.uniforms.uNoiseAmplitude.value = 0.22;
        shaderMaterial.uniforms.uTime.value = elapsedTime;

        const style = getComputedStyle(document.documentElement);
        const accentHex = style.getPropertyValue("--accent").trim() || "#3B82F6";
        const colorA = new THREE.Color(accentHex);

        const colorB = colorA.clone();
        const hsl = { h: 0, s: 0, l: 0 };
        colorB.getHSL(hsl);
        colorB.setHSL((hsl.h + 0.097) % 1.0, hsl.s, hsl.l);

        shaderMaterial.uniforms.uColorA.value.lerp(colorA, 0.05);
        shaderMaterial.uniforms.uColorB.value.lerp(colorB, 0.05);
    });

    const isMobile = window.innerWidth < 768;
    const posX = isMobile ? 0 : viewport.width * 0.18;
    const posY = isMobile ? 0.35 : 0.05;
    const scale = isMobile ? 0.65 : 1.0;

    return (
        <mesh ref={meshRef} position={[posX, posY, 0]} scale={scale}>
            <icosahedronGeometry args={[1.3, 64]} />
            <primitive object={shaderMaterial} attach="material" />
        </mesh>
    );
}

function ParticleRing() {
    const pointsRef = useRef();
    const materialRef = useRef();
    const { viewport } = useThree();
    const count = 350;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 1.9 + Math.random() * 1.8;
            const heightOffset = (Math.random() - 0.5) * 1.2;
            arr[i * 3] = Math.cos(angle) * distance;
            arr[i * 3 + 1] = heightOffset;
            arr[i * 3 + 2] = Math.sin(angle) * distance;
        }
        return arr;
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = -state.clock.getElapsedTime() * 0.045;
            pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.015;
        }
        if (materialRef.current) {
            const style = getComputedStyle(document.documentElement);
            const accentHex = style.getPropertyValue("--accent").trim() || "#3B82F6";
            materialRef.current.color.lerp(new THREE.Color(accentHex), 0.05);
        }
    });

    const isMobile = window.innerWidth < 768;
    const posX = isMobile ? 0 : viewport.width * 0.18;
    const posY = isMobile ? 0.35 : 0.05;
    const scale = isMobile ? 0.65 : 1.0;

    return (
        <points ref={pointsRef} position={[posX, posY, 0]} scale={scale}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                    count={count}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                size={0.038}
                transparent
                opacity={0.32}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ThreeDBackground() {
    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.28] dark:opacity-35"
        >
            <Canvas camera={{ position: [0, 0, 4.5], fov: 55 }}>
                <BlobMesh />
                <ParticleRing />
            </Canvas>
        </div>
    );
}
