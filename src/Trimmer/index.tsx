import React from 'react';

import {Indicator} from './Indicator';
import {Track} from './Track';
import {colors} from './styleConstants';
import {ImageSourcePropType, ImageStyle, StyleProp} from 'react-native';
import {Position} from './Marker';

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
  trackColor?: string;
  indicatorColor?: string;
  markerColor?: string;
  backdropColor?: string;
  imageBackgroundSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
  renderCustomMarker?: (position: Position) => React.ReactNode;
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
  trackColor = colors.track,
  indicatorColor = colors.indicator,
  markerColor = colors.marker,
  backdropColor = colors.backdrop,
  imageBackgroundSource,
  imageStyle,
  renderCustomMarker,
}: TrimmerProps) => {
  return (
    <Track
      trackColor={trackColor}
      imageBackgroundSource={imageBackgroundSource}
      imageStyle={imageStyle}
      height={height}
      renderIndicator={(trackWidth: number) => {
        return (
          <Indicator
            backdropColor={backdropColor}
            markerColor={markerColor}
            indicatorColor={indicatorColor}
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
            renderCustomMarker={renderCustomMarker}
          />
        );
      }}
    />
  );
};
