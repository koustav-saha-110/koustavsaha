import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTheme } from "../hooks/useTheme";
import { OrbitControls } from "@react-three/drei";

gsap.registerPlugin(ScrollTrigger);

const wireframeVertexShader = `
    varying vec3 vPosition;
    void main() {
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const wireframeFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec3 vPosition;

    void main() {
        // Scanning height band wave
        float scan = sin(vPosition.y * 3.5 - uTime * 2.8) * 0.5 + 0.5;
        
        // Intensify neon wireframe colors along the scanning coordinate
        vec3 color = uColor * (0.35 + scan * 2.0);
        float alpha = 0.15 + scan * 0.35;

        gl_FragColor = vec4(color, alpha);
    }
`;

const ringVertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const ringFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
        float wave1 = sin(vUv.y * 6.28318 * 2.5 - uTime * 3.8) * 0.5 + 0.5;
        float wave2 = cos(vUv.y * 6.28318 * 1.8 + uTime * 2.8) * 0.5 + 0.5;

        vec3 waveColor1 = vec3(0.08, 0.82, 0.92); // Electric Cyan
        vec3 waveColor2 = vec3(0.92, 0.08, 0.82); // Hot Pink/Magenta

        vec3 base = mix(uColor, waveColor1, wave1 * 0.45);
        vec3 finalColor = mix(base, waveColor2, wave2 * 0.45);

        // Tube boundary falloff
        float edge = sin(vUv.x * 3.14159);
        edge = pow(edge, 1.6);

        gl_FragColor = vec4(finalColor, edge * 0.7);
    }
`;

const coreVertexShader = `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;

    float getDisplacement(vec3 p) {
        return sin(p.x * 3.0 + uTime * 1.4) * sin(p.y * 2.5 - uTime * 1.1) * sin(p.z * 2.8 + uTime * 1.6) * 0.14;
    }

    void main() {
        vNormal = normalize(normalMatrix * normal);
        float disp = getDisplacement(position);
        vec3 newPosition = position + normal * disp;
        vPosition = newPosition;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`;

const coreFragmentShader = `
    uniform float uTime;
    uniform vec3 uColor;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

        float wave = sin(vPosition.y * 3.5 - uTime * 1.8) * 0.5 + 0.5;
        vec3 tealCyan = vec3(0.08, 0.92, 0.68); // Translucent green/teal
        vec3 baseColor = mix(uColor, tealCyan, wave * 0.4);

        vec3 finalColor = baseColor + vec3(fresnel * 0.8);

        gl_FragColor = vec4(finalColor, 0.8);
    }
`;

function Sculpture({ activeColor }) {
    const groupRef = useRef();
    const wireframeRef = useRef();
    const sphereRef = useRef();
    const ringRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(activeColor) }
    }), []);

    useEffect(() => {
        uniforms.uColor.value.set(activeColor);
    }, [activeColor, uniforms]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        uniforms.uTime.value = time;

        if (groupRef.current && !ScrollTrigger.active) {
            groupRef.current.rotation.y = time * 0.15;
            groupRef.current.rotation.x = time * 0.08;
        }
        if (sphereRef.current) {
            sphereRef.current.position.y += Math.sin(time * 2) * 0.001;
        }
    });

    useEffect(() => {
        const wireframe = wireframeRef.current;
        const sphere = sphereRef.current;
        const ring = ringRef.current;
        const group = groupRef.current;

        if (!wireframe || !sphere || !ring || !group) return;

        const aboutSection = document.getElementById("about");
        if (!aboutSection) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
            }
        });

        tl.to(group.rotation, {
            y: Math.PI * 2,
            x: Math.PI * 0.4,
            ease: "none",
        }, 0);

        tl.to(wireframe.position, {
            y: 1.1,
            ease: "power1.inOut",
        }, 0);

        tl.to(sphere.position, {
            y: -1.1,
            ease: "power1.inOut",
        }, 0);

        tl.to(ring.position, {
            y: 0,
            scale: 1.25,
            ease: "power1.inOut",
        }, 0);

        tl.to(wireframe.rotation, {
            y: -Math.PI * 2.5,
            x: Math.PI * 0.5,
            ease: "none",
        }, 0);

        tl.to(ring.rotation, {
            x: Math.PI * 2.5,
            y: -Math.PI * 1.5,
            ease: "none",
        }, 0);

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
        };
    }, []);

    return (
        <group ref={groupRef}>
            <mesh ref={wireframeRef} position={[0, 0, 0]}>
                <octahedronGeometry args={[1.4, 0]} />
                <shaderMaterial
                    vertexShader={wireframeVertexShader}
                    fragmentShader={wireframeFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                    wireframe
                />
            </mesh>

            <mesh ref={ringRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2.0, 0.04, 16, 100]} />
                <shaderMaterial
                    vertexShader={ringVertexShader}
                    fragmentShader={ringFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </mesh>

            <mesh ref={sphereRef} position={[0, 0, 0]}>
                <sphereGeometry args={[0.75, 64, 64]} />
                <shaderMaterial
                    vertexShader={coreVertexShader}
                    fragmentShader={coreFragmentShader}
                    uniforms={uniforms}
                    transparent
                />
            </mesh>
        </group>
    );
}

export default function About3DCanvas() {
    const { theme } = useTheme();
    const activeColor = theme === "dark" ? "#3b82f6" : "#2563eb";

    return (
        <div
            className="w-full h-80 md:h-96 relative z-10 overflow-hidden"
            data-testid="about-3d-canvas"
        >
            <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
                <About3DCanvasContent activeColor={activeColor} />
            </Canvas>
        </div>
    );
}

function About3DCanvasContent({ activeColor }) {
    return (
        <>
            <ambientLight intensity={1.1} />
            <directionalLight position={[5, 10, 5]} intensity={2} />
            <directionalLight position={[-5, -5, -5]} intensity={1} color={activeColor} />
            <pointLight position={[0, 0, 2]} intensity={1.2} />

            <Sculpture activeColor={activeColor} />
            <OrbitControls enableZoom={false} />
        </>
    );
}
