import React from 'react';
import { Color, Vector3 } from 'three';
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
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(halfSize, 0, 0)} color={new Color('#ff0000')} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, halfSize, 0)} color={new Color('#00ff00')} />
      <Arrow start={new Vector3(0, 0, 0)} end={new Vector3(0, 0, halfSize)} color={new Color('#0000ff')} />

      {showGrid && <gridHelper args={[size, size]} />}
    </>
  );
};

CoordinateSystem.defaultProps = defaultProps;
