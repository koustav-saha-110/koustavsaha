import { useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../hooks/useTheme";
import { OrbitControls } from "@react-three/drei";

const helixVertexShader = `
    uniform float uTime;
    uniform vec2 uPointer;
    attribute float aStrand;
    varying float vStrand;
    varying vec3 vPosition;

    void main() {
        vStrand = aStrand;
        
        // Calculate helix angle rotation based on Y height and uTime
        float angle = position.y * 2.8 + uTime * 1.2;
        if (aStrand > 0.5) {
            angle += 3.14159265; // 180 degrees phase offset for Strand B
        }

        float radius = 0.8;
        vec3 helixPos = position;
        helixPos.x = cos(angle) * radius;
        helixPos.z = sin(angle) * radius;

        // Apply interactive mouse tilts in 3D space
        float angleX = uPointer.y * 0.35;
        float angleZ = -uPointer.x * 0.35;

        // X rotation matrix
        float cosX = cos(angleX);
        float sinX = sin(angleX);
        float yRot = helixPos.y * cosX - helixPos.z * sinX;
        float zRot = helixPos.y * sinX + helixPos.z * cosX;

        // Z rotation matrix
        float cosZ = cos(angleZ);
        float sinZ = sin(angleZ);
        float xFinal = helixPos.x * cosZ - yRot * sinZ;
        float yFinal = helixPos.x * sinZ + yRot * cosZ;

        vec3 finalPos = vec3(xFinal, yFinal, zRot);
        vPosition = finalPos;

        vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        // Size attenuation for points (made larger for better visibility)
        gl_PointSize = (22.0 / -mvPosition.z);
    }
`;

const particleFragmentShader = `
    uniform vec3 uColor;
    varying float vStrand;

    void main() {
        // Draw anti-aliased round particles
        float dist = distance(gl_PointCoord, vec2(0.5));
        if (dist > 0.5) discard;

        // Sharpen the radial glow to increase brightness
        float alpha = smoothstep(0.5, 0.08, dist) * 0.95;

        // Boost color brightness for a glowing neon aesthetic
        vec3 color = uColor * 1.5;
        if (vStrand > 0.5) {
            color = mix(color, vec3(0.52, 0.18, 0.92) * 1.5, 0.45);
        }

        gl_FragColor = vec4(color, alpha);
    }
`;

const rungFragmentShader = `
    uniform vec3 uColor;
    varying float vStrand;

    void main() {
        // Blend and boost brightness of rungs
        vec3 color = mix(uColor, vec3(0.52, 0.18, 0.92), vStrand * 0.45) * 1.4;

        // Center line fading (chemical bond style representation)
        float fade = abs(vStrand - 0.5) * 2.0; 
        fade = 0.15 + fade * 0.45;

        // Increased opacity from 0.45 to 0.70
        gl_FragColor = vec4(color, fade * 0.7);
    }
`;

function HelixDNA({ activeColor }) {
    const pointsRef = useRef();
    const rungsRef = useRef();

    const particleCount = 70;
    const rungCount = 18;

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uColor: { value: new THREE.Color(activeColor) }
    }), []);

    useEffect(() => {
        uniforms.uColor.value.set(activeColor);
    }, [activeColor, uniforms]);

    const { particlePositions, particleStrand } = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        const strand = new Float32Array(particleCount);
        const height = 2.6;

        for (let i = 0; i < particleCount; i++) {
            const isStrandB = i >= particleCount / 2;
            const idx = isStrandB ? i - particleCount / 2 : i;
            const ratio = idx / (particleCount / 2 - 1);

            const y = (ratio - 0.5) * height;

            pos[i * 3] = 0;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = 0;

            strand[i] = isStrandB ? 1.0 : 0.0;
        }

        return { particlePositions: pos, particleStrand: strand };
    }, []);

    const { rungPositions, rungStrand } = useMemo(() => {
        const pos = new Float32Array(rungCount * 2 * 3);
        const strand = new Float32Array(rungCount * 2);
        const height = 2.6;

        for (let i = 0; i < rungCount; i++) {
            const ratio = i / (rungCount - 1);
            const y = (ratio - 0.5) * height;

            pos[i * 6] = 0;
            pos[i * 6 + 1] = y;
            pos[i * 6 + 2] = 0;
            strand[i * 2] = 0.0;

            pos[i * 6 + 3] = 0;
            pos[i * 6 + 4] = y;
            pos[i * 6 + 5] = 0;
            strand[i * 2 + 1] = 1.0;
        }

        return { rungPositions: pos, rungStrand: strand };
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        uniforms.uTime.value = time;
        uniforms.uPointer.value.set(0, 0);
    });

    return (
        <group>
            <lineSegments ref={rungsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[rungPositions, 3]}
                        count={rungCount * 2}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-aStrand"
                        args={[rungStrand, 1]}
                        count={rungCount * 2}
                        itemSize={1}
                    />
                </bufferGeometry>
                <shaderMaterial
                    vertexShader={helixVertexShader}
                    fragmentShader={rungFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </lineSegments>

            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particlePositions, 3]}
                        count={particleCount}
                        itemSize={3}
                    />
                    <bufferAttribute
                        attach="attributes-aStrand"
                        args={[particleStrand, 1]}
                        count={particleCount}
                        itemSize={1}
                    />
                </bufferGeometry>
                <shaderMaterial
                    vertexShader={helixVertexShader}
                    fragmentShader={particleFragmentShader}
                    uniforms={uniforms}
                    transparent
                    depthWrite={false}
                />
            </points>
        </group>
    );
}

export default function Education3DCanvas() {
    const { theme } = useTheme();
    const activeColor = theme === "dark" ? "#3b82f6" : "#2563eb";

    return (
        <div
            className="w-full h-56 md:h-64 relative z-10 overflow-hidden"
            data-testid="education-3d-canvas"
        >
            <Canvas camera={{ position: [0, 0, 3.6], fov: 50 }}>
                <HelixDNA activeColor={activeColor} />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
