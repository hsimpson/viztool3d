import React, { useRef, useEffect } from 'react';
import { Color } from 'react-three-fiber';
import { Vector3, Mesh, DoubleSide } from 'three';

interface PlaneProps {
  width?: number;
  height?: number;
  color: Color;
  position?: Vector3;
  lookAt?: Vector3;
}

// creates a plane with normal pointing to (1,0,0)
export const Plane = (props: PlaneProps): React.ReactElement => {
  const { width, height, color, position, lookAt } = props;
  const meshRef = useRef<Mesh>();

  useEffect(() => {
    if (lookAt) {
      meshRef.current.lookAt(lookAt);
    }
  }, [lookAt]);

  return (
    <mesh ref={meshRef} position={position}>
      <planeBufferGeometry attach="geometry" args={[width, height]} />
      <meshStandardMaterial attach="material" color={color} side={DoubleSide} />
    </mesh>
  );
};
