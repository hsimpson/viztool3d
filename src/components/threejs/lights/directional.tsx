import React, { useEffect, useRef } from 'react';
import { Color, Group, MathUtils, Object3D, Vector3 } from 'three';
import { getEulerRotationFromVectors } from '../../../utils/math';
import { Arrow, ArrowT } from '../arrow';
import { Capsule } from '../primitives/capsule';
import { Sphere } from '../primitives/sphere';

interface DirectionalLightProps {
  position: Vector3;
  target: Vector3;
}

const getParallelArrows = (radius: number, length: number): ArrowT[] => {
  const arrows: ArrowT[] = [];

  const count = 4;
  const step = 0.2;
  const startOffset = 1.8;

  const begin = (count * step) / 2 - 0.5 * step;
  for (let h = 0; h < count; h++) {
    for (let w = 0; w < count; w++) {
      const x = w * step;
      const y = h * step;
      const start = new Vector3(x - begin, y - begin, radius * startOffset);
      const end = new Vector3(x - begin, y - begin, length);

      arrows.push({
        start,
        end,
      });
    }
  }
  return arrows;
};

const getSphericalRays = (radius: number): ArrowT[] => {
  const directions: ArrowT[] = [];
  const stepAngle = 45;
  const count = 360 / stepAngle;
  const startOffset = 1.8;
  const lengthFactor = 0.5;

  // optimization: start at 1 to not put the poles into the array often
  for (let i = 1; i < count; i++) {
    for (let j = 1; j < count; j++) {
      // let phi = 0;
      let phi = i * stepAngle;
      let theta = j * stepAngle;
      // console.log(`𝜑 = ${phi}, 𝜃 = ${theta}`);

      phi = MathUtils.degToRad(phi);
      theta = MathUtils.degToRad(theta);

      const x = Math.sin(theta) * Math.sin(phi);
      const y = Math.cos(theta);
      const z = Math.sin(theta) * Math.cos(phi);
      // console.log(`${x}, ${y}, ${z}`);
      const direction = new Vector3(x, y, z);
      const start = direction.clone().multiplyScalar(radius * startOffset);
      const end = start.clone().add(start.clone().setLength(radius * lengthFactor));
      directions.push({
        start,
        end,
      });
    }
  }

  // adding the poles
  const northDirection = new Vector3(0, 1, 0);
  const northStart = northDirection.clone().multiplyScalar(radius * startOffset);
  const northEnd = northStart.clone().add(northStart.clone().setLength(radius * lengthFactor));

  const southDirection = new Vector3(0, -1, 0);
  const southStart = southDirection.clone().multiplyScalar(radius * startOffset);
  const southEnd = southStart.clone().add(southStart.clone().setLength(radius * lengthFactor));
  directions.push({
    start: northStart,
    end: northEnd,
  });
  directions.push({
    start: southStart,
    end: southEnd,
  });

  return directions;
};

export const DirectionalLight = (props: DirectionalLightProps): React.ReactElement => {
  const { position, target } = props;

  const direction = new Vector3();
  direction.subVectors(target, position);

  const lightTarget = new Object3D();
  lightTarget.position.copy(target);

  const groupRef = useRef<Group>();

  useEffect(() => {
    groupRef.current.lookAt(direction);
  });

  const radius = 0.2;
  const color = new Color('#ebe70c');
  const opacity = 1.0;

  const parallelArrows = getParallelArrows(radius, direction.length());
  const sphericalRays = getSphericalRays(radius);

  return (
    <group position={position}>
      <group ref={groupRef}>
        <directionalLight target={lightTarget} />
        <Sphere color={color} radius={radius} opacity={opacity} />
        {parallelArrows.map((arrow, index) => {
          return <Arrow key={index} start={arrow.start} end={arrow.end} color={color} opacity={1.0} />;
        })}
      </group>
      {sphericalRays.map((ray, index) => {
        const direction = new Vector3();
        direction.subVectors(ray.end, ray.start);
        const rotation = getEulerRotationFromVectors(new Vector3(0, 1, 0), direction);
        return (
          <group key={index} position={ray.start} rotation={rotation}>
            <Capsule
              color={color}
              opacity={opacity}
              radiusBottom={radius * 0.15}
              radiusTop={radius * 0.15}
              height={direction.length()}
            />
          </group>
        );
      })}
    </group>
  );
};
