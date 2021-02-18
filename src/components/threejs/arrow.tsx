import { Line } from '@react-three/drei';
import React, { useRef } from 'react';
import { a, useSpring } from 'react-spring/three';
import { Color } from 'react-three-fiber';
import { Euler, Quaternion, Vector3 } from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { easeOutBounce, easeOutExpo } from '../../utils/easings';

interface ArrowProps {
  start: Vector3;
  end: Vector3;
  color: Color;
}

export const Arrow = (props: ArrowProps): React.ReactElement => {
  const { start, end, color } = props;

  const tipRadius = 0.04;
  const tipLength = 0.075;
  const up = new Vector3(0, 1, 0);

  const direction = new Vector3();
  direction.subVectors(end, start).normalize();

  const rot = new Quaternion();
  rot.setFromUnitVectors(up, direction);
  const euler = new Euler();
  euler.setFromQuaternion(rot);

  const rotationVector = euler.toVector3();

  const startPoint = start.toArray();
  const endPoint = end.toArray();
  const rotation = rotationVector.toArray();

  const lineRef = useRef<Line2>(null);

  const arrowLineAnimation = useSpring({
    from: {
      endPoint: startPoint,
    },
    to: {
      endPoint: endPoint,
    },
    config: {
      duration: 2000,
      easing: easeOutBounce,
    },
    delay: 2000,
    onFrame: (value) => {
      const positions = [...startPoint, ...value.endPoint];
      lineRef.current.geometry.setPositions(positions);
    },
  });

  const tipVisibilityAnimation = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 500,
      easing: easeOutExpo,
    },
    delay: 2500,
  });

  return (
    <group>
      <Line ref={lineRef} points={[startPoint, startPoint]} color={color} lineWidth={3} />

      <a.group position={arrowLineAnimation.endPoint} rotation={rotation}>
        <mesh>
          <coneBufferGeometry attach="geometry" args={[tipRadius, tipLength]} />
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
