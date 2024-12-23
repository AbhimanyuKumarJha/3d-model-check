import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { CameraControls } from "../utils/CameraControls";

const ThreeDMap = () => {
  const gltf = useGLTF("/model.glb");

  return (
    <Canvas
      // -29,2,0
      camera={{ position: [-29, 2, 0], fov: 60 }}
      style={{ width: "100vw", height: "100vh" }}
    >
      <ambientLight intensity={0.6} />

      <directionalLight position={[10, 10, 5]} intensity={1} />

      <primitive object={gltf.scene} scale={1} />

      <CameraControls />
    </Canvas>
  );
};

export default ThreeDMap;
