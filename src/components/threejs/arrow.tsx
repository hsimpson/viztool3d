import React from 'react';
import { Line } from '@react-three/drei';
import { Color } from 'react-three-fiber';
import * as THREE from 'three';
import { a, useSpring } from 'react-spring/three';
// import { a, useSpring } from '@react-spring/three';
import { easeOutElastic } from '../../utils/easings';

interface ArrowProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  color: Color;
}

export const Arrow = (props: ArrowProps): React.ReactElement => {
  const tipRadius = 0.04;
  const tipLength = 0.075;
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

  const animProps = useSpring({
    // loop: { reverse: true },
    from: {
      scale: [0, 0, 0],
      tipPos: props.start.toArray(),
    },
    to: {
      scale: [1, 1, 1],
      tipPos: props.end.toArray(),
    },
    config: {
      duration: 2000,
      easing: easeOutElastic,
    },
    delay: 5000,
  });

  return (
    <group>
      <a.group scale={animProps.scale}>
        <Line points={[startPoint, endPoint]} color={props.color} lineWidth={3} />
      </a.group>
      <a.group position={animProps.tipPos} rotation={rotation}>
        <mesh>
          <coneBufferGeometry attach="geometry" args={[tipRadius, tipLength]} />
          {/* <meshBasicMaterial attach="material" color={props.color} /> */}
          <meshStandardMaterial attach="material" color={props.color} />
        </mesh>
      </a.group>
    </group>
  );
};
