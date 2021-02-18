import { OrbitControls } from '@react-three/drei';
import React from 'react';
// import { Cube } from './cube';
import { CoordinateSystem } from './coordinatesystem';
import { SkyBox } from './skybox';
import { Vector3 } from 'three';
import { Arrow } from './arrow';

// function randomVecs(count: number): Vector3[] {
//   const array: Vector3[] = [];
//   for (let i = 0; i < count; i++) {
//     const rnd = new Vector3(
//       MathUtils.randFloat(-1, 1),
//       MathUtils.randFloat(-1, 1),
//       MathUtils.randFloat(-1, 1)
//     );

//     array.push(rnd);
//   }
//   return array;
// }

export const Scene = (): React.ReactElement => {
  const size = 4;
  return (
    <>
      <OrbitControls />
      <SkyBox size={size * 10} />
      <ambientLight color="#ffffff" intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CoordinateSystem size={size} showGrid={true} />
      <Arrow start={new Vector3(-2, 2, -2)} end={new Vector3(0, 0, 0)} color={0xff00ff} />
      {/* {vecs.map((v, i) => {
        return <Arrow key={i} start={new Vector3(0, 0, 0)} end={v} color={0xffff00} />;
      })} */}

      {/* <Cube /> */}
    </>
  );
};
