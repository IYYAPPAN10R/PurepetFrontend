import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, ContactShadows, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const BOTTLES = [
    { id: 0, type: 'slim', capColor: '#0ea5e9', liqColor: '#bae6fd', scale: 0.9, title: 'Slim Cylindrical' },
    { id: 1, type: 'square', capColor: '#10b981', liqColor: '#7dd3fc', scale: 0.85, title: 'Square-Edge' },
    { id: 2, type: 'curved', capColor: '#f43f5e', liqColor: '#38bdf8', scale: 0.95, title: 'Curved Sports' },
    { id: 3, type: 'tall', capColor: '#8b5cf6', liqColor: '#0ea5e9', scale: 0.8, title: 'Tall Premium' },
    { id: 4, type: 'short', capColor: '#f97316', liqColor: '#0284c7', scale: 0.95, title: 'Short Wide' },
];

const getCurvedPoints = (scaleX = 1, scaleY = 1) => {
    const points = [];
    for (let i = 0; i <= 30; i++) {
        const t = i / 30;
        // Ergonomic grip curve
        const r = 1.3 - Math.sin(t * Math.PI) * 0.2 + (t < 0.2 ? -0.1 : 0);
        points.push(new THREE.Vector2(r * scaleX, t * 5 * scaleY));
    }
    return points;
};

const curvedPoints = getCurvedPoints();
const curvedLiquidPoints = getCurvedPoints(0.9, 0.8);

function BottleGeometry({ type, material, liquidMaterial, capMaterial }) {
    if (type === 'slim') {
        return (
            <group position={[0, -2.5, 0]}>
                <mesh position={[0, 2.5, 0]} material={material}>
                    <cylinderGeometry args={[1.1, 1.1, 5, 64]} />
                </mesh>
                <mesh position={[0, 5.3, 0]} material={material}>
                    <cylinderGeometry args={[0.4, 1.1, 0.6, 64]} />
                </mesh>
                <mesh position={[0, 5.8, 0]} material={material}>
                    <cylinderGeometry args={[0.4, 0.4, 0.5, 32]} />
                </mesh>
                <mesh position={[0, 6.1, 0]} material={capMaterial}>
                    <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
                </mesh>
                <mesh position={[0, 1.8, 0]} material={liquidMaterial}>
                    <cylinderGeometry args={[1.0, 1.0, 3.5, 32]} />
                </mesh>
            </group>
        );
    } else if (type === 'square') {
        return (
            <group position={[0, -2.5, 0]}>
                <RoundedBox args={[2.0, 4.5, 2.0]} radius={0.4} smoothness={16} position={[0, 2.25, 0]} material={material} />
                <mesh position={[0, 4.8, 0]} material={material}>
                    <cylinderGeometry args={[0.5, 1.2, 0.6, 64]} />
                </mesh>
                <mesh position={[0, 5.3, 0]} material={material}>
                    <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />
                </mesh>
                <mesh position={[0, 5.6, 0]} material={capMaterial}>
                    <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
                </mesh>
                <mesh position={[0, 1.5, 0]} material={liquidMaterial}>
                    <boxGeometry args={[1.8, 2.8, 1.8]} />
                </mesh>
            </group>
        );
    } else if (type === 'curved') {
        return (
            <group position={[0, -2.5, 0]}>
                <mesh position={[0, 0, 0]} material={material}>
                    <latheGeometry args={[curvedPoints, 64]} />
                </mesh>
                <mesh position={[0, 5.3, 0]} material={material}>
                    <cylinderGeometry args={[0.5, 1.3, 0.7, 64]} />
                </mesh>
                <mesh position={[0, 5.8, 0]} material={material}>
                    <cylinderGeometry args={[0.5, 0.5, 0.5, 32]} />
                </mesh>
                <mesh position={[0, 6.1, 0]} material={capMaterial}>
                    <cylinderGeometry args={[0.52, 0.52, 0.3, 32]} />
                </mesh>
                <mesh position={[0, 0, 0]} material={liquidMaterial}>
                    <latheGeometry args={[curvedLiquidPoints, 64]} />
                </mesh>
            </group>
        );
    } else if (type === 'tall') {
        return (
            <group position={[0, -3.5, 0]}>
                <mesh position={[0, 3.5, 0]} material={material}>
                    <cylinderGeometry args={[1.0, 1.0, 7, 64]} />
                </mesh>
                <mesh position={[0, 7.5, 0]} material={material}>
                    <cylinderGeometry args={[0.35, 1.0, 1.0, 64]} />
                </mesh>
                <mesh position={[0, 8.2, 0]} material={material}>
                    <cylinderGeometry args={[0.35, 0.35, 0.5, 32]} />
                </mesh>
                <mesh position={[0, 8.5, 0]} material={capMaterial}>
                    <cylinderGeometry args={[0.37, 0.37, 0.3, 32]} />
                </mesh>
                <mesh position={[0, 2.8, 0]} material={liquidMaterial}>
                    <cylinderGeometry args={[0.92, 0.92, 5.5, 32]} />
                </mesh>
            </group>
        );
    } else if (type === 'short') {
        return (
            <group position={[0, -1.8, 0]}>
                <mesh position={[0, 1.5, 0]} material={material}>
                    <cylinderGeometry args={[1.8, 1.8, 3, 64]} />
                </mesh>
                <mesh position={[0, 3.3, 0]} material={material}>
                    <cylinderGeometry args={[0.6, 1.8, 0.7, 64]} />
                </mesh>
                <mesh position={[0, 3.8, 0]} material={material}>
                    <cylinderGeometry args={[0.6, 0.6, 0.5, 32]} />
                </mesh>
                <mesh position={[0, 4.1, 0]} material={capMaterial}>
                    <cylinderGeometry args={[0.62, 0.62, 0.3, 32]} />
                </mesh>
                <mesh position={[0, 1.2, 0]} material={liquidMaterial}>
                    <cylinderGeometry args={[1.7, 1.7, 2.2, 32]} />
                </mesh>
            </group>
        );
    }
}

function Bottle({ data, index, currentIndex }) {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    // Calculate wrapped offset for endless carousel feel
    const num = BOTTLES.length;
    let offset = index - currentIndex;

    if (offset > Math.floor(num / 2)) offset -= num;
    if (offset < -Math.floor(num / 2)) offset += num;

    const isCenter = offset === 0;

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Position: Spread elements out linearly but push them back exponentially to create depth
        const targetX = offset * 4.5;
        const targetZ = Math.abs(offset) * -2.5;

        // Scale: Scale down the ones in the background
        const targetScale = data.scale * (1 - Math.abs(offset) * 0.15);

        // Rotation: Slight tilt facing center, interactive spin when hovered
        let targetRotY = offset * -0.15;
        if (isCenter) {
            targetRotY += state.clock.elapsedTime * (hovered ? 0.6 : 0.15);
        }

        // Dampen values for super smooth transition animations
        groupRef.current.position.x = THREE.MathUtils.damp(groupRef.current.position.x, targetX, 5, delta);
        groupRef.current.position.z = THREE.MathUtils.damp(groupRef.current.position.z, targetZ, 5, delta);
        groupRef.current.scale.setScalar(THREE.MathUtils.damp(groupRef.current.scale.x, targetScale, 4, delta));

        // Lerp rotation smoothly
        if (isCenter && hovered) {
            groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 8, delta);
        } else {
            groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotY, 6, delta);
        }
    });

    const materialConfig = useMemo(() => ({
        transmission: 0.99,
        opacity: 1,
        transparent: true,
        roughness: 0.08,
        thickness: 0.8,
        ior: 1.5,
        envMapIntensity: 2.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        color: "#ffffff"
    }), []);

    const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial(materialConfig), [materialConfig]);

    const liquidMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        transmission: 0.85,
        opacity: 0.95,
        transparent: true,
        roughness: 0.1,
        ior: 1.33,
        color: data.liqColor
    }), [data.liqColor]);

    const capMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: data.capColor,
        roughness: 0.2,
        metalness: 0.6,
        envMapIntensity: 1.5
    }), [data.capColor]);

    return (
        <group
            ref={groupRef}
            onPointerOver={(e) => {
                e.stopPropagation();
                if (isCenter) setHovered(true);
            }}
            onPointerOut={() => setHovered(false)}
        >
            <Float speed={2} rotationIntensity={0.05} floatIntensity={isCenter ? 0.5 : 0.1}>
                <BottleGeometry type={data.type} material={glassMaterial} liquidMaterial={liquidMaterial} capMaterial={capMaterial} />
            </Float>

            {/* Soft minimal glow/shadow underneath */}
            {isCenter && (
                <ContactShadows
                    position={[0, -2.8, 0]}
                    opacity={0.15}
                    scale={6}
                    blur={3}
                    far={3}
                    color="#1e293b"
                />
            )}
        </group>
    );
}

export default function Bottle3DCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-swiping carousel (changes every 3 seconds)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % BOTTLES.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const handleNext = () => setCurrentIndex((prev) => (prev + 1) % BOTTLES.length);
    const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + BOTTLES.length) % BOTTLES.length);

    // Modern UI overlay arrow button style
    const buttonStyle = {
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.8)', borderRadius: '50%',
        width: '44px', height: '44px', cursor: 'pointer', zIndex: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#334155', fontSize: '18px', boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        transition: 'all 0.2s ease', paddingLeft: '2px', paddingBottom: '2px'
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>

            {/* React Three Fiber Canvas Context */}
            <Canvas camera={{ position: [0, 1.5, 14], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.8} />
                <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
                <spotLight position={[-10, 10, -10]} angle={0.3} penumbra={1} intensity={1} color="#bae6fd" />

                {/* Render Carousel Bottles */}
                {BOTTLES.map((b, i) => (
                    <Bottle key={b.id} data={b} index={i} currentIndex={currentIndex} />
                ))}

                {/* Studio lighting preset for a premium reflection */}
                <Environment preset="studio" />
            </Canvas>

            {/* Complete UI Interaction Layer */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                {/* Navigation Arrows */}
                <button
                    onClick={handlePrev}
                    style={{ ...buttonStyle, left: '20px', pointerEvents: 'auto' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                    aria-label="Previous product"
                >
                    &#10094;
                </button>
                <button
                    onClick={handleNext}
                    style={{ ...buttonStyle, right: '20px', pointerEvents: 'auto' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.05)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                    aria-label="Next product"
                >
                    &#10095;
                </button>

                {/* Dynamic Pagination / Navigation Dots */}
                <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', pointerEvents: 'auto' }}>
                    {BOTTLES.map((b, i) => (
                        <div
                            key={b.id}
                            onClick={() => setCurrentIndex(i)}
                            style={{
                                width: currentIndex === i ? '30px' : '12px',
                                height: '6px',
                                borderRadius: '6px',
                                background: currentIndex === i ? '#334155' : 'rgba(148, 163, 184, 0.4)',
                                cursor: 'pointer',
                                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                boxShadow: currentIndex === i ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none'
                            }}
                            title={b.title}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}
