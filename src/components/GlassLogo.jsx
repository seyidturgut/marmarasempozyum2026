import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import { RGBELoader } from 'three-stdlib';

const GlassLogo = ({ logoUrl = "/cropped-marmaralogo.png", size = 200 }) => {
    const containerRef = useRef();

    useEffect(() => {
        if (!containerRef.current) return;

        // --- CONSTANTS ---
        const PHOTO_INSET = 0.97;
        const PHOTO_Z = 0.00;
        const envUrl = "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/royal_esplanade_2k.hdr";

        // --- SCENE ---
        const scene = new THREE.Scene();
        // Transparent background to blend with Hero section

        const camera = new THREE.PerspectiveCamera(45, 1, 0.02, 200);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Clear existing children to prevent duplicates (Strict Mode fix)
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
            containerRef.current.appendChild(renderer.domElement);
        }

        // --- LIGHTS ---
        scene.add(new THREE.AmbientLight(0xffffff, 0.8));
        const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
        keyLight.position.set(6, 10, 8);
        scene.add(keyLight);

        // --- ENV ---
        const rgbeLoader = new RGBELoader();
        rgbeLoader.load(envUrl, (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping;
            scene.environment = texture;
        });

        // --- GROUP ---
        const group = new THREE.Group();
        scene.add(group);

        // --- GLASS ---
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#ffffff"),
            transmission: 1.0,
            opacity: 1.0,
            metalness: 0.1,
            roughness: 0.05,
            ior: 1.5,
            thickness: 0.8,
            specularIntensity: 1.0,
            envMapIntensity: 1.2,
            clearcoat: 1.0,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false
        });

        const glassGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.4, 64);
        glassGeo.rotateX(Math.PI / 2);
        const glassMesh = new THREE.Mesh(glassGeo, glassMat);
        glassMesh.renderOrder = 2;
        group.add(glassMesh);

        // --- LOGO ---
        const textureLoader = new THREE.TextureLoader();
        const logoTexture = textureLoader.load(logoUrl);
        logoTexture.colorSpace = THREE.SRGBColorSpace;

        const photoMat = new THREE.MeshStandardMaterial({
            map: logoTexture,
            side: THREE.DoubleSide,
            transparent: true,
            roughness: 0.4,
            metalness: 0.1
        });

        const photoGeo = new THREE.CircleGeometry(1.2 * PHOTO_INSET, 64);
        const photoMesh = new THREE.Mesh(photoGeo, photoMat);
        photoMesh.position.set(0, 0, PHOTO_Z);
        photoMesh.renderOrder = 1;
        group.add(photoMesh);

        // --- ANIMATION ---
        let t = 0;
        const animate = () => {
            const frameId = requestAnimationFrame(animate);
            t += 0.01;

            group.rotation.y += 0.015;
            group.rotation.x = Math.cos(t * 0.5) * 0.1;
            group.rotation.z = Math.sin(t * 0.3) * 0.05;

            renderer.render(scene, camera);
            return frameId;
        };
        const frameId = animate();

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(frameId);
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    if (Array.isArray(object.material)) {
                        object.material.forEach(mat => mat.dispose());
                    } else {
                        object.material.dispose();
                    }
                }
            });
            renderer.dispose();
        };
    }, [logoUrl, size]);

    return (
        <div
            ref={containerRef}
            className="glass-logo-wrapper"
            style={{ width: size, height: size, margin: '0 auto' }}
        />
    );
};

export default GlassLogo;
