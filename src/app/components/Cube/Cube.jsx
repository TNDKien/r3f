"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RenderTexture, PerspectiveCamera, Text } from "@react-three/drei";

export default function Cube(props) {
  const ref = useRef();
  const textRef = useRef();
  const dodecaRef = useRef();
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  {
    /* Rotates the cubes */
  }
  useFrame((_, delta) => {
    ref.current.rotation.y += delta;
    ref.current.rotation.z += delta * 0.5;
  });

  useFrame(() => {
    if (dodecaRef.current) {
      dodecaRef.current.rotation.x += 0.01;
      dodecaRef.current.rotation.y += 0.01;
    }
  });

  {
    /* Animates the text */
  }
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
        {/* RenderTexture with Text and Dodecahedron */}
        <RenderTexture attach="map" anisotropy={16}>
          <color attach="background" args={["red"]} />
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0, 0, 5]}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />

          {/* Animated Text */}
          <Text
            fontSize={2}
            color="white"
            ref={textRef}
            anchorX="center"
            anchorY="middle"
          >
            Hard to read?
          </Text>

          {/* Dodecahedron inside RenderTexture */}
          <mesh ref={dodecaRef} position={[0, 0, 0]} scale={1}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RenderTexture>
      </meshStandardMaterial>
    </mesh>
  );
}
