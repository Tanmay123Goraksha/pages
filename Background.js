import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const StarBackground = ({ children }) => {
    const containerRef = useRef();
    const rendererRef = useRef();
    const sphereRef = useRef();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        {
            url: '/kjsit_1.jpg',
            description: 'K.J. Somaiya Institute of Technology',
        },
        {
            url:'kjsit_2.jpg',
            description:'K.J. Somaiya Institute of Technology',
        }
        // Add more image URLs and descriptions as needed
    ];

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('8k_mars.jpg');
        const sphereGeometry = new THREE.SphereGeometry(300, 50, 50);
        const sphereMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: false, opacity: 1 });
        const redSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        redSphere.position.set(500, 0, -750);
        scene.add(redSphere);
        sphereRef.current = redSphere;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const animate = () => {
            requestAnimationFrame(animate);
            if (sphereRef.current) {
                sphereRef.current.rotation.y += 0.008;
            }
            rendererRef.current.render(scene, camera);
        };

        animate();

        const container = containerRef.current;
        const rendererInstance = rendererRef.current;

        return () => {
            container.removeChild(rendererInstance.domElement);
        };
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // Change images every 3 seconds

        return () => clearInterval(interval);
    }, []);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="container">
            <div ref={containerRef}></div>
            <div className="title">Our Collaborations</div>
            <div className="slider">
                <button onClick={prevImage} className="slider-btn">&#10094;</button>
                <img src={images[currentImageIndex].url} alt="slider" className="slider-image" />
                <button onClick={nextImage} className="slider-btn">&#10095;</button>
            </div>
            <div className="description-box">
                <div className="description">{images[currentImageIndex].description}</div>
            </div>
        </div>
    );
};

export default StarBackground;
