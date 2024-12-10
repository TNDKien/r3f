"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RenderTexture, PerspectiveCamera, Text } from "@react-three/drei";

export default function Cube(props) {
  const ref = useRef();
  const textRef = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  // Rotation logic, similar to the Box component
  useFrame((_, delta) => {
    ref.current.rotation.y += delta; // Rotates along the Y-axis
    ref.current.rotation.z += delta * 0.5; // Adds a slow Z-axis rotation
  });

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.x = Math.sin(state.clock.elapsedTime) * 4;
    }
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={() => click(!clicked)}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial>
        {/* 
        without attach="map" i cannot apply the texture to the material's map property 
        aniostropy is the sharpness of the texture
        */}
        <RenderTexture attach="map" anisotropy={16}>
          <color attach="background" args={["red"]} />
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />

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
  );
}
