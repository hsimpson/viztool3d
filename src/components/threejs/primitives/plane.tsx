import { Line } from '@react-three/drei';
import React, { useEffect, useRef } from 'react';
import { Color, DoubleSide, Mesh, Vector3 } from 'three';

interface PlaneProps {
  width?: number;
  height?: number;
  color: Color;
  opacity?: number;
  position?: Vector3;
  lookAt?: Vector3;
  line?: boolean;
}

// creates a plane with normal pointing to (1,0,0)
export const Plane = (props: PlaneProps): React.ReactElement => {
  let { width, height } = props;
  const { color, opacity, position, lookAt, line } = props;
  const meshRef = useRef<Mesh>();

  useEffect(() => {
    if (lookAt) {
      meshRef.current.lookAt(lookAt);
    }
  }, [lookAt]);

  const getPlaneMesh = (): React.ReactElement => {
    if (line) {
      const points: Vector3[] = [];
      width = width ?? 1;
      height = height ?? 1;

      points.push(new Vector3(-width / 2, height / 2, 0));
      points.push(new Vector3(width / 2, height / 2, 0));
      points.push(new Vector3(width / 2, -height / 2, 0));
      points.push(new Vector3(-width / 2, -height / 2, 0));
      points.push(new Vector3(-width / 2, height / 2, 0));

      return (
        <mesh ref={meshRef} position={position}>
          <Line points={points} lineWidth={2} color={color} opacity={opacity ?? 1} transparent={true} />
        </mesh>
      );
    } else {
      return (
        <mesh ref={meshRef} position={position}>
          <planeBufferGeometry attach="geometry" args={[width, height]} />
          <meshStandardMaterial
            attach="material"
            color={color}
            side={DoubleSide}
            opacity={opacity ?? 1}
            transparent={true}
          />
        </mesh>
      );
    }
  };

  return getPlaneMesh();
};
