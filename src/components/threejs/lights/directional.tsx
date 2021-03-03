import React, { useEffect, useRef } from 'react';
import { Color, Group, Object3D, Vector3 } from 'three';
import { Arrow, ArrowT } from '../arrow';
import { Plane } from '../plane';

interface DirectionalLightProps {
  position: Vector3;
  target: Vector3;
}

export const DirectionalLight = (props: DirectionalLightProps): React.ReactElement => {
  const { position, target } = props;

  const direction = new Vector3();
  direction.subVectors(target, position);
  const length = direction.length();

  const arrows: ArrowT[] = [];

  const count = 4;
  const step = 0.2;
  const begin = (count * step) / 2 - 0.5 * step;
  for (let h = 0; h < count; h++) {
    for (let w = 0; w < count; w++) {
      const x = w * step;
      const y = h * step;
      const start = new Vector3(x - begin, y - begin, 0);
      const end = new Vector3(x - begin, y - begin, length);

      arrows.push({
        start,
        end,
      });
    }
  }

  const lightTarget = new Object3D();
  lightTarget.position.copy(target);

  const color = new Color('#ebe70c');

  const groupRef = useRef<Group>();

  useEffect(() => {
    groupRef.current.lookAt(direction);
  });

  return (
    <group ref={groupRef} position={position}>
      <directionalLight target={lightTarget} />
      {arrows.map((arrow, index) => {
        return <Arrow key={index} start={arrow.start} end={arrow.end} color={color} opacity={0.3} />;
      })}
    </group>
  );
};
