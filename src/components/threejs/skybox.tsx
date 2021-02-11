import React from 'react';
import * as THREE from 'three';

type SkyBoxProps = {
  size: number;
} & typeof defaultProps;

const defaultProps = {
  size: 50,
};

export const SkyBox = (props: SkyBoxProps): React.ReactElement => {
  return (
    <mesh scale={[props.size, props.size, props.size]}>
      <boxBufferGeometry attach="geometry" />
      <meshBasicMaterial attach="material" color="#333333" side={THREE.BackSide} />
    </mesh>
  );
};

SkyBox.defaultProps = defaultProps;
