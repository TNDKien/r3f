"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RenderTexture, PerspectiveCamera, Text } from "@react-three/drei";

export default function Cube(props) {
  const cubeRef = useRef();
  const dodecaGroupRef = useRef();
  const textRef = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Rotate the Cube
  useFrame((_, delta) => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta; // Rotate the cube
      cubeRef.current.rotation.z += delta * 0.5;
    }
  });

  // Animate Dodecahedrons' Floating Positions
  useFrame((state) => {
    if (dodecaGroupRef.current) {
      const time = state.clock.elapsedTime;
      dodecaGroupRef.current.children.forEach((child, index) => {
        // Make each dodecahedron float in a circular pattern
        const angle = (index / 6) * Math.PI * 2; // Spread them evenly
        child.position.x = Math.cos(angle + time) * 2; // Circular X
        child.position.y = Math.sin(angle + time) * 2; // Circular Y
        child.position.z = Math.sin(angle + time) * 2; // Circular Z
        child.rotation.x += 0.02; // Rotate the dodecahedron
        child.rotation.y += 0.02;
      });
    }
  });

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 4;
    }
  });

  return (
    <group {...props} ref={cubeRef}>
      {/* Main Cube */}
      <mesh
        scale={clicked ? 1.5 : 1}
        onClick={() => click(!clicked)}
        onPointerOver={() => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial>
          {/* RenderTexture on Cube Faces */}
          <RenderTexture attach="map" anisotropy={16}>
            <color attach="background" args={["red"]} />
            <PerspectiveCamera
              makeDefault
              manual
              aspect={1 / 1}
              position={[0, 0, 5]}
            />
            <ambientLight intensity={0.5} />
            <Text
              fontSize={2}
              color="white"
              ref={textRef}
              anchorX="center"
              anchorY="middle"
            >
              Hard to read?
            </Text>
          </RenderTexture>
        </meshStandardMaterial>
      </mesh>

      {/* Floating Dodecahedrons */}
      <group ref={dodecaGroupRef}>
        {Array.from({ length: 6 }).map((_, index) => (
          <mesh key={index}>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        ))}
      </group>
    </group>
  );
}
