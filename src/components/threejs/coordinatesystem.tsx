import React from 'react';
import { Arrow } from './arrow';
import * as THREE from 'three';

function randomVecs(count: number): THREE.Vector3[] {
  const array: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const rnd = new THREE.Vector3(
      THREE.MathUtils.randFloat(-1, 1),
      THREE.MathUtils.randFloat(-1, 1),
      THREE.MathUtils.randFloat(-1, 1)
    );

    array.push(rnd);
  }
  return array;
}

export const CoordinateSystem = (): React.ReactElement => {
  const vecs = randomVecs(50);

  return (
    <>
      <Arrow start={new THREE.Vector3(0, 0, 0)} end={new THREE.Vector3(1, 0, 0)} color={0xff0000} />
      <Arrow start={new THREE.Vector3(0, 0, 0)} end={new THREE.Vector3(0, 1, 0)} color={0x00ff00} />
      <Arrow start={new THREE.Vector3(0, 0, 0)} end={new THREE.Vector3(0, 0, 1)} color={0x0000ff} />

      <Arrow start={new THREE.Vector3(0, 0, 0)} end={new THREE.Vector3(0, -1, 0)} color={0xff00ff} />
      {/* <Arrow start={new THREE.Vector3(0, 0, 0)} end={rnd} color={0xffff00} /> */}

      {vecs.map((v, i) => {
        return <Arrow key={i} start={new THREE.Vector3(0, 0, 0)} end={v} color={0xffff00} />;
      })}
    </>
  );
};
