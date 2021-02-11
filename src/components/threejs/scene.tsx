import { OrbitControls } from '@react-three/drei';
import React from 'react';
// import { Cube } from './cube';
import { CoordinateSystem } from './coordinatesystem';
import { SkyBox } from './skybox';

export const Scene = (): React.ReactElement => {
  return (
    <>
      <OrbitControls />
      <SkyBox />
      <ambientLight color="#ffffff" intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CoordinateSystem />
      {/* <Cube /> */}
    </>
  );
};
