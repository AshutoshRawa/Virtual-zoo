import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './ARViewer.css';

/**
 * 3D Viewer using Three.js
 * Creates a beautiful floating 3D card with the animal's photo rendered as a texture.
 * No external model IDs or CDN dependencies – works fully offline.
 */
const ARViewer = ({ animalName, posterUrl }) => {
    const mountRef = useRef(null);
    const rendererRef = useRef(null);
    const frameRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const W = mount.clientWidth;
        const H = mount.clientHeight;

        // --- Scene ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x080d1a);
        scene.fog = new THREE.FogExp2(0x080d1a, 0.04);

        // --- Camera ---
        const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
        camera.position.set(0, 0, 4);

        // --- Renderer ---
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
        renderer.setSize(W, H);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.1;
        mount.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // --- Lighting ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0x00e5ad, 2.5);
        keyLight.position.set(3, 4, 5);
        keyLight.castShadow = true;
        scene.add(keyLight);

        const rimLight = new THREE.DirectionalLight(0x1a8cff, 1.2);
        rimLight.position.set(-3, -2, -4);
        scene.add(rimLight);

        // --- Floating Photo Card ---
        const loader = new THREE.TextureLoader();
        const cardGroup = new THREE.Group();
        scene.add(cardGroup);

        // Card back
        const backGeo = new THREE.BoxGeometry(3.4, 2.4, 0.06);
        const backMat = new THREE.MeshStandardMaterial({
            color: 0x0a1628,
            metalness: 0.7,
            roughness: 0.3,
        });
        const cardBack = new THREE.Mesh(backGeo, backMat);
        cardGroup.add(cardBack);

        // Glowing border frame
        const frameMat = new THREE.MeshStandardMaterial({
            color: 0x00e5ad,
            emissive: 0x00e5ad,
            emissiveIntensity: 0.6,
            metalness: 1,
            roughness: 0.1,
        });
        const frameEdges = [
            { w: 3.5, h: 0.06, d: 0.07, y: 1.23, x: 0 },
            { w: 3.5, h: 0.06, d: 0.07, y: -1.23, x: 0 },
            { w: 0.06, h: 2.52, d: 0.07, x: 1.77, y: 0 },
            { w: 0.06, h: 2.52, d: 0.07, x: -1.77, y: 0 },
        ];
        frameEdges.forEach(({ w, h, d, x, y }) => {
            const edge = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), frameMat);
            edge.position.set(x, y, 0.035);
            cardGroup.add(edge);
        });

        // Photo face
        if (posterUrl) {
            loader.load(
                posterUrl,
                (texture) => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    const faceGeo = new THREE.PlaneGeometry(3.2, 2.2);
                    const faceMat = new THREE.MeshStandardMaterial({
                        map: texture,
                        metalness: 0.0,
                        roughness: 0.5,
                    });
                    const face = new THREE.Mesh(faceGeo, faceMat);
                    face.position.z = 0.04;
                    cardGroup.add(face);
                },
                undefined,
                () => {
                    // If image fails – show a solid teal card
                    const fallback = new THREE.Mesh(
                        new THREE.PlaneGeometry(3.2, 2.2),
                        new THREE.MeshStandardMaterial({ color: 0x003d2d })
                    );
                    fallback.position.z = 0.04;
                    cardGroup.add(fallback);
                }
            );
        }

        // --- Floating particles (ambient sparkle) ---
        const particleCount = 200;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 16;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particles = new THREE.Points(
            particleGeo,
            new THREE.PointsMaterial({ size: 0.04, color: 0x00e5ad, transparent: true, opacity: 0.45 })
        );
        scene.add(particles);

        // --- Mouse-based card tilt ---
        let targetRotX = 0;
        let targetRotY = 0;
        let currentRotX = 0;
        let currentRotY = 0;

        const onMouseMove = (e) => {
            const rect = mount.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / W) * 2 - 1;
            const y = -((e.clientY - rect.top) / H) * 2 + 1;
            targetRotY = x * 0.4;
            targetRotX = y * 0.25;
        };

        const onTouchMove = (e) => {
            const touch = e.touches[0];
            const rect = mount.getBoundingClientRect();
            const x = ((touch.clientX - rect.left) / W) * 2 - 1;
            const y = -((touch.clientY - rect.top) / H) * 2 + 1;
            targetRotY = x * 0.4;
            targetRotX = y * 0.25;
        };

        mount.addEventListener('mousemove', onMouseMove);
        mount.addEventListener('touchmove', onTouchMove, { passive: true });

        // --- Animation Loop ---
        const clock = new THREE.Clock();
        const animate = () => {
            frameRef.current = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth card tilt lerp
            currentRotX += (targetRotX - currentRotX) * 0.06;
            currentRotY += (targetRotY - currentRotY) * 0.06;
            cardGroup.rotation.x = currentRotX;
            cardGroup.rotation.y = currentRotY;

            // Gentle float
            cardGroup.position.y = Math.sin(t * 0.9) * 0.08;

            // Glow pulse on emissive
            frameMat.emissiveIntensity = 0.5 + Math.sin(t * 2.2) * 0.25;

            // Particles slow drift
            particles.rotation.y = t * 0.02;
            particles.rotation.x = t * 0.01;

            renderer.render(scene, camera);
        };
        animate();

        // --- Resize handler ---
        const handleResize = () => {
            const newW = mount.clientWidth;
            const newH = mount.clientHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };
        window.addEventListener('resize', handleResize);

        // --- Cleanup ---
        return () => {
            cancelAnimationFrame(frameRef.current);
            window.removeEventListener('resize', handleResize);
            mount.removeEventListener('mousemove', onMouseMove);
            mount.removeEventListener('touchmove', onTouchMove);
            mount.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [posterUrl]);

    return (
        <div className="ar-viewer-wrapper">
            <div className="ar-viewer-header">
                <span className="ar-badge"><span className="ar-dot"></span> Interactive 3D</span>
                <span className="ar-badge ar-badge-info">🖱️ Move cursor to tilt</span>
            </div>
            <div ref={mountRef} className="ar-canvas-mount" />
            <div className="ar-controls-hint">
                <span>Move your mouse over the card to tilt it in 3D space</span>
            </div>
        </div>
    );
};

export default ARViewer;
