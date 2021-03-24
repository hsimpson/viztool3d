import { OrbitControls } from '@react-three/drei';
import React from 'react';
import { Vector3 } from 'three';
import { CoordinateSystem } from './coordinatesystem';
import { DirectionalLight } from './lights/directional';
import { SkyBox } from './skybox';

export const Scene = (): React.ReactElement => {
  const size = 10;
  return (
    <>
      <OrbitControls />
      <SkyBox size={size * 10} />
      <ambientLight color="#ffffff" intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CoordinateSystem size={size} showGrid={true} />
      <DirectionalLight position={new Vector3(-1, 1, 0)} target={new Vector3(0, 0, 0)} />
    </>
  );
};
