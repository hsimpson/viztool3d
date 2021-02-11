import React from 'react';

export const Cube = (): React.ReactElement => {
  return (
    <mesh>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color="#03fc49" />
    </mesh>
  );
};
