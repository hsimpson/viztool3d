import { Euler, Quaternion, Vector3 } from 'three';

export function getEulerRotationFromVectors(start: Vector3, end: Vector3): Euler {
  const rot = new Quaternion();
  const euler = new Euler();

  rot.setFromUnitVectors(start.clone().normalize(), end.clone().normalize());
  euler.setFromQuaternion(rot);

  return euler;
}
