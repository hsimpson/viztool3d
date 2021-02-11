import React from 'react';
import * as THREE from 'three';

export const SkyBox = (): React.ReactElement => {
  return (
    <mesh scale={[50, 50, 50]}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="#333333" side={THREE.BackSide} />
    </mesh>
  );
};
