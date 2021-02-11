import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Scene } from './threejs/scene';

export const Viewer = (): React.ReactElement => {
  return (
    <Canvas pixelRatio={window.devicePixelRatio} camera={{ position: [2, 2, 5], fov: 45 }} colorManagement={true}>
      <Scene />
    </Canvas>
  );
};
