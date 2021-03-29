import React, { useMemo } from 'react';
import { Color, MeshStandardMaterial } from 'three';

interface CapsuleProps {
  color: Color;
  opacity?: number;
  radiusTop: number;
  radiusBottom: number;
  height: number;
}

export const Capsule = ({ opacity = 1.0, ...props }: CapsuleProps): React.ReactElement => {
  const { color, radiusTop, radiusBottom, height } = props;

  const material = useMemo(() => new MeshStandardMaterial({ color, opacity, transparent: true }), [color, opacity]);

  const radialSegments = 32;
  const heightSegments = 8;

  return (
    <>
      <mesh material={material} position={[0, height / 2, 0]}>
        <sphereBufferGeometry args={[radiusTop, radialSegments, radialSegments, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
      <mesh material={material}>
        <cylinderBufferGeometry args={[radiusTop, radiusBottom, height, radialSegments, heightSegments, true]} />
      </mesh>
      <mesh material={material} position={[0, -height / 2, 0]} rotation-x={Math.PI}>
        <sphereBufferGeometry args={[radiusBottom, radialSegments, radialSegments, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </>
  );
};
