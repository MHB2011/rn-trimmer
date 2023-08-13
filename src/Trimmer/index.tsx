import React from 'react';
import {View} from 'react-native';
import {Indicator} from './Indicator';
import {Track} from './Track';

interface TrimmerProps {
  startValue: number;
  endValue: number;
  height?: number;
  markerSize?: number;
  borderWidth?: number;
  onChange?: (start: number, end: number) => void;
  gap?: number;
}

export const Trimmer = ({
  startValue,
  endValue,
  height = 50,
  markerSize = 24,
  borderWidth = 2,
  onChange,
  gap = 0,
}: TrimmerProps) => {
  return (
    <View>
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
              gap={gap}
            />
          );
        }}
      />
    </View>
  );
};
