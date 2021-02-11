import { OrbitControls } from '@react-three/drei';
import React from 'react';
// import { Cube } from './cube';
import { CoordinateSystem } from './coordinatesystem';
import { SkyBox } from './skybox';

export const Scene = (): React.ReactElement => {
  const size = 4;
  return (
    <>
      <OrbitControls />
      <SkyBox size={size * 2} />
      <ambientLight color="#ffffff" intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CoordinateSystem size={size} showGrid={true} />
      {/* <Cube /> */}
    </>
  );
};
