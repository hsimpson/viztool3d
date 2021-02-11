import React from 'react';
import { Line } from '@react-three/drei';
import { Color } from 'react-three-fiber';
import * as THREE from 'three';

interface ArrowProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: Color;
}

export const Arrow = (props: ArrowProps): React.ReactElement => {
  const tipRadius = 0.05;
  const tipLength = 0.1;
  const up = new THREE.Vector3(0, 1, 0);

  const direction = new THREE.Vector3();
  direction.subVectors(props.end, props.start).normalize();

  const rot = new THREE.Quaternion();
  rot.setFromUnitVectors(up, direction);
  const euler = new THREE.Euler();
  euler.setFromQuaternion(rot);

  const rotationVector = euler.toVector3();

  const startPoint = props.start.toArray();
  const endPoint = props.end.toArray();
  const rotation = rotationVector.toArray();

  return (
    <group>
      <Line points={[startPoint, endPoint]} color={props.color} lineWidth={2} />
      <mesh position={props.end} rotation={rotation}>
        <coneBufferGeometry attach="geometry" args={[tipRadius, tipLength]} />
        {/* <meshBasicMaterial attach="material" color={props.color} /> */}
        <meshStandardMaterial attach="material" color={props.color} />
      </mesh>
    </group>
  );
};
