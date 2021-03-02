import React from 'react';
import { Color, Object3D, Vector3 } from 'three';
import { Arrow } from '../arrow';
import { Plane } from '../plane';

interface DirectionalLightProps {
  position: Vector3;
  target: Vector3;
}

export const DirectionalLight = (props: DirectionalLightProps): React.ReactElement => {
  const { position, target } = props;

  const arrowStartPositions: Vector3[] = [position];

  const color = new Color('#ebe70c');
  const lightTarget = new Object3D();
  lightTarget.position.copy(target);

  const direction = new Vector3();
  direction.subVectors(target, position);

  return (
    <group>
      <directionalLight target={lightTarget} />
      <Plane color={color} position={position} lookAt={direction} />
      {arrowStartPositions.map((start, index) => {
        return <Arrow key={index} start={start} end={target} color={color} />;
      })}
    </group>
  );
};
