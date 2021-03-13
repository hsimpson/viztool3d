import React from 'react';
import { Color } from 'react-three-fiber';

interface SphereProps {
  color: Color;
  radius: number;
  opacity?: number;
}

export const Sphere = (props: SphereProps): React.ReactElement => {
  const { color, radius, opacity } = props;
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[radius, 32, 32]} />
      <meshStandardMaterial attach="material" color={color} transparent={true} opacity={opacity ?? 1} />
    </mesh>
  );
};
