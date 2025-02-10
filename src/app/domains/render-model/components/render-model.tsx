/**
 * 작성자: KYD
 * 기능: 메인 페이지 3D 모델 렌더링
 * 프로세스 설명: 프로세스 복잡시 노션링크 첨부권장
 */
"use client";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { angleToRadians } from "../utils/angle-to-radians";

interface IRenderModel {}

const RenderModel: React.FC<IRenderModel> = () => {
  //SECTION HOOK호출 영역
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역

  //!SECTION 메서드 영역

  return (
    <div className="h-[480px] w-full">
      <Canvas>
        <Suspense fallback={null}>
          <PerspectiveCamera
            makeDefault
            position={[0, 2, 10]}
            rotation={[-0.4, 0, 0]}
          />
          <OrbitControls
            minAzimuthAngle={angleToRadians(-10)}
            maxAzimuthAngle={angleToRadians(10)}
            minPolarAngle={angleToRadians(60)}
            maxPolarAngle={angleToRadians(80)}
          />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} />

          {/* GLB 모델 렌더링 */}
          {/* 
          <mesh
            castShadow
            receiveShadow
            // @ts-ignore
            geometry={nodes.Sphere001.geometry}
            // @ts-ignore
            material={materials.Scene_Default}
          />
          <primitive object={nodes.Scene} position={[0, 0, 0]} scale={1} /> */}
          <mesh position={[0, 0.5, 0]}>
            <sphereGeometry args={[0.5, 32, 32]} />
            <meshStandardMaterial color="#E0DA46" />
          </mesh>

          {/* 바닥면 */}
          <mesh rotation={[0, 0, 0]} position={[0, -0.5, 0]}>
            <boxGeometry args={[5, 1, 5]} />
            <meshStandardMaterial color="#60FC4E" />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default RenderModel;
