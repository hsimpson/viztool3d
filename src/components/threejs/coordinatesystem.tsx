import React from 'react';
import { Vector3 } from 'three';
import { Arrow } from './arrow';

type CoordinateSystemProps = {
  size: number;
  showGrid: boolean;
} & typeof defaultProps;

const defaultProps = {
  size: 5,
  showGrid: true,
};

export const CoordinateSystem = (props: CoordinateSystemProps): React.ReactElement => {
  const size = props.size / 2;
  return (
    <>
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(size, 0, 0)} color={0xff0000} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, size, 0)} color={0x00ff00} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, 0, size)} color={0x0000ff} />

      {props.showGrid && <gridHelper args={[props.size, props.size * 2]}></gridHelper>}
    </>
  );
};

CoordinateSystem.defaultProps = defaultProps;
