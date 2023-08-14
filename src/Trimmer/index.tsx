import React from 'react';

import {Indicator} from './Indicator';
import {Track} from './Track';

interface TrimmerProps {
  startValue: number;
  endValue: number;
  height?: number;
  markerSize?: number;
  borderWidth?: number;
  onChange?: (start: number, end: number) => void;
  gapPx?: number;
  min: number;
  max: number;
}

export const Trimmer = ({
  startValue,
  endValue,
  height = 50,
  markerSize = 24,
  borderWidth = 2,
  onChange,
  gapPx = 0,
  min,
  max,
}: TrimmerProps) => {
  return (
    <Track
      height={height}
      renderIndicator={(trackWidth: number) => {
        return (
          <Indicator
            startValue={startValue}
            endValue={endValue}
            trackHeight={height}
            trackWidth={trackWidth}
            markerSize={markerSize}
            borderWidth={borderWidth}
            onChange={onChange}
            gapPx={gapPx}
            min={min}
            max={max}
          />
        );
      }}
    />
  );
};
