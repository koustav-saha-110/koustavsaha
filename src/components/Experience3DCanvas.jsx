import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../hooks/useTheme";
import { OrbitControls } from "@react-three/drei";

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
        // Neon pulse: a sine wave translating along the torus length (vUv.y)
        float pulse = sin(vUv.y * 6.28318 * 2.0 - uTime * 4.5);
        pulse = smoothstep(0.65, 0.98, pulse); // Sharpen into a glowing pulse band

        // Tube edge fading (vUv.x runs around the tube diameter)
        float edge = sin(vUv.x * 3.14159);
        edge = pow(edge, 1.8);

        // Mix base ambient ring shade with bright glowing pulse
        vec3 color = uColor * (0.22 + pulse * 2.2);
        float alpha = (0.15 + pulse * 0.85) * edge;

        gl_FragColor = vec4(color, alpha);
    }
`;

const coreVertexShader = `
    uniform float uTime;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Fast 3D sine-based noise displacement
    float getDisplacement(vec3 p) {
        return sin(p.x * 3.2 + uTime * 1.5) * sin(p.y * 2.8 - uTime * 1.2) * sin(p.z * 3.0 + uTime * 1.8) * 0.12;
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
        // Simple forward viewing direction
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.2);

        // Dynamic plasma color shifting
        float shift = sin(vPosition.x * 2.5 + uTime * 2.0) * 0.5 + 0.5;
        vec3 complementaryColor = vec3(0.52, 0.18, 0.92); // Cosmic purple
        vec3 color = mix(uColor, complementaryColor, shift * 0.5);

        // Overlay bright rim light glow
        color += vec3(fresnel * 0.6);

        gl_FragColor = vec4(color, 0.85);
    }
`;

function Gyroscope({ activeColor }) {
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();
    const coreRef = useRef();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(activeColor) }
    }), []);

    useEffect(() => {
        uniforms.uColor.value.set(activeColor);
    }, [activeColor, uniforms]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const pointer = state.pointer;

        uniforms.uTime.value = time;

        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = time * 0.35;
            ring1Ref.current.rotation.y = time * 0.08;
        }

        if (ring2Ref.current) {
            ring2Ref.current.rotation.y = -time * 0.45;
            ring2Ref.current.rotation.z = time * 0.12;
        }

        if (ring3Ref.current) {
            ring3Ref.current.rotation.z = time * 0.6;
            ring3Ref.current.rotation.x = -time * 0.15;
        }

        if (coreRef.current) {
            coreRef.current.rotation.y = -time * 0.2;
        }
    });

    return (
        <group>
            <mesh ref={ring1Ref}>
                <torusGeometry args={[1.5, 0.035, 16, 100]} />
                <shaderMaterial
                    vertexShader={ringVertexShader}
                    fragmentShader={ringFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </mesh>

            <mesh ref={ring2Ref} rotation={[0, Math.PI / 4, 0]}>
                <torusGeometry args={[1.15, 0.026, 16, 100]} />
                <shaderMaterial
                    vertexShader={ringVertexShader}
                    fragmentShader={ringFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </mesh>

            <mesh ref={ring3Ref} rotation={[Math.PI / 4, 0, 0]}>
                <torusGeometry args={[0.82, 0.02, 16, 80]} />
                <shaderMaterial
                    vertexShader={ringVertexShader}
                    fragmentShader={ringFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </mesh>

            <mesh ref={coreRef}>
                <sphereGeometry args={[0.42, 64, 64]} />
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

export default function Experience3DCanvas() {
    const { theme } = useTheme();
    const activeColor = theme === "dark" ? "#3b82f6" : "#2563eb";

    return (
        <div
            className="w-full h-56 md:h-64 relative z-10 overflow-hidden"
            data-testid="experience-3d-canvas"
        >
            <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }}>
                <ambientLight intensity={1.1} />
                <directionalLight position={[5, 10, 5]} intensity={2} />
                <directionalLight position={[-5, -5, -5]} intensity={1} color={activeColor} />

                <Gyroscope activeColor={activeColor} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
