import { a, useSpring } from '@react-spring/three';
import { Line } from '@react-three/drei';
import React, { useRef } from 'react';
import { Color, Mesh, Vector3 } from 'three';
import { Line2 } from 'three-stdlib';
import { easeOutBounce, easeOutExpo } from '../../utils/easings';
import { getEulerRotationFromVectors } from '../../utils/math';

export interface ArrowT {
  start: Vector3;
  end: Vector3;
}
type ArrowProps = ArrowT & {
  color: Color;
  opacity?: number;
};

export const Arrow = (props: ArrowProps): React.ReactElement => {
  const { start, end, color, opacity } = props;

  const tipRadius = 0.03;
  const tipLength = 0.075;
  const tipRadialSegments = 16;
  const up = new Vector3(0, 1, 0);

  // calc direction of vector
  const direction = new Vector3();
  direction.subVectors(end, start);

  const rotationVector = getEulerRotationFromVectors(up, direction).toVector3();

  // subtract the half tip length from the direction vector
  direction.setLength(direction.length() - tipLength / 2);
  const endVector = start.clone().add(direction);

  const startVector = start;
  // const endPoint = endVector.toArray();
  const rotation = rotationVector.toArray();

  const lineRef = useRef<Line2>(null);
  const tipRef = useRef<Mesh>(null);

  const arrowLineAnimation = useSpring({
    from: {
      endPoint: startVector.toArray(),
      opacity: 0,
    },
    to: {
      endPoint: endVector.toArray(),
      opacity: opacity ?? 1,
    },
    config: {
      duration: 2000,
      easing: easeOutBounce,
    },
    delay: 2000,
    onChange: (value) => {
      const positions = [...startVector.toArray(), ...value.endPoint];
      lineRef.current.geometry.setPositions(positions);
      lineRef.current.material.opacity = value.opacity;
    },
  });

  const tipVisibilityAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: opacity ?? 1,
    },
    config: {
      duration: 500,
      easing: easeOutExpo,
    },
    delay: 2500,
  });

  // useFrame(({ camera }) => {
  //   const distance = camera.position.distanceTo(end);
  //   const scale = distance / 2;
  //   tipRef.current.scale.set(scale, scale, scale);
  // });

  return (
    <group>
      <Line
        ref={lineRef}
        points={[startVector, startVector]}
        color={color}
        lineWidth={2}
        transparent={true}
        opacity={0}
      />

      <a.group position={arrowLineAnimation.endPoint} rotation={rotation}>
        <mesh ref={tipRef}>
          <coneBufferGeometry attach="geometry" args={[tipRadius, tipLength, tipRadialSegments]} />
          <a.meshStandardMaterial
            attach="material"
            color={color}
            opacity={tipVisibilityAnimation.opacity}
            transparent={true}
          />
        </mesh>
      </a.group>
    </group>
  );
};
