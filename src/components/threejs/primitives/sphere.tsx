import React from 'react';
import { Color } from 'react-three-fiber';

interface SphereProps {
  color: Color;
  radius: number;
  opacity?: number;
}

export const Sphere = (props: SphereProps): React.ReactElement => {
  const { color, radius, opacity } = props;

  const widthSegments = 32;
  const heightSegments = 32;

  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[radius, widthSegments, heightSegments]} />
      <meshStandardMaterial attach="material" color={color} transparent={true} opacity={opacity ?? 1} />
    </mesh>
  );
};
