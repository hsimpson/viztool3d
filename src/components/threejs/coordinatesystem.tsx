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
  const { size, showGrid } = props;
  const halfSize = size / 2;
  return (
    <>
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(halfSize, 0, 0)} color={0xff0000} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, halfSize, 0)} color={0x00ff00} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, 0, halfSize)} color={0x0000ff} />

      {showGrid && <gridHelper args={[size, size * 2]} />}
    </>
  );
};

CoordinateSystem.defaultProps = defaultProps;
