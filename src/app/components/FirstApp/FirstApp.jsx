"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Environment } from "@react-three/drei";
import Box from "../Box/Box";
import Cube from "../Cube/Cube";

export default function FirstApp() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      {/* penumbra is the softness of the lighting*/}
      <spotLight position={[10, 10, 10]} angle={0.45} penumbra={0.1} />
      <Cube position={[-2, 0, 0]} />
      <Cube position={[2, -2, -2]} />
      <Cube position={[0, 2, -4]} />
      <Cube position={[-4, 0, -6]} />
      <OrbitControls />
      <Text
        position={[0, 2, 0]}
        fontSize={0.5}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        Welcome to my first R3F app!
      </Text>
      <Environment preset="apartment" background />;
    </Canvas>
  );
}
