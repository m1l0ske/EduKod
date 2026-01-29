"use client"
import React from "react"
import { Canvas } from "@react-three/fiber"
import { CameraControls, SoftShadows } from "@react-three/drei"
import * as THREE from "three"
import Model from "./Model"

const CanvasSetUp = () => (
  <Canvas
    shadows
    camera={{ position: [3, 3, 5], fov: 50 }}
  >

    <CameraControls makeDefault />

    <ambientLight intensity={0.3} />

    <directionalLight
      castShadow
      position={[5, 10, 5]}
      intensity={2}
      shadow-mapSize={[2048, 2048]}
      shadow-camera-near={1}
      shadow-camera-far={50}
      shadow-camera-left={-10}
      shadow-camera-right={10}
      shadow-camera-top={10}
      shadow-camera-bottom={-10}
    />


    {/* <mesh castShadow position={[0, 1, 0]}>
      <sphereGeometry />
      <meshStandardMaterial color="white" />
    </mesh> */}
    <Model />

  </Canvas>
)

export default CanvasSetUp
