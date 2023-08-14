import React, {useMemo} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {Marker, Position} from './Marker';

interface IndicatorProp {
  trackHeight: number;
  trackWidth: number;
  markerSize: number;
  borderWidth: number;
  onChange?: (start: number, end: number) => void;
  gapPx: number;
  startValue: number;
  endValue: number;
  min: number;
  max: number;
  indicatorColor: string;
  markerColor: string;
  backdropColor: string;
  renderCustomMarker?: (position: Position) => React.ReactNode;
}

export const Indicator = ({
  trackHeight,
  trackWidth,
  markerSize,
  borderWidth,
  onChange,
  gapPx,
  startValue,
  endValue,
  min,
  max,
  indicatorColor,
  markerColor,
  backdropColor,
  renderCustomMarker,
}: IndicatorProp) => {
  const startPx = interpolate(startValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP,
  });
  const endPx = interpolate(endValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP,
  });

  const indicatorStyle: ViewStyle = {
    position: 'absolute',
    left: startPx,
    right: trackWidth - endPx,
    height: trackHeight,
    backgroundColor: 'transparent',
    borderColor: indicatorColor,
    borderWidth: borderWidth,
  };

  const startBackdropViewStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: backdropColor,
      width: startPx,
      height: '100%',
    }),
    [backdropColor, startPx],
  );
  const endBackdropViewStyle: ViewStyle = useMemo(
    () => ({
      backgroundColor: backdropColor,
      width: trackWidth - endPx,
      position: 'absolute',
      left: endPx,
      height: '100%',
      zIndex: -1,
    }),
    [backdropColor, endPx, trackWidth],
  );

  return (
    <GestureHandlerRootView style={S.flex}>
      <View style={startBackdropViewStyle} />
      <Animated.View style={indicatorStyle}>
        <Marker
          position="left"
          startPx={startPx}
          endPx={endPx}
          trackWidth={trackWidth}
          trackHeight={trackHeight}
          borderWidth={borderWidth}
          markerSize={markerSize}
          onChange={onChange}
          gapPx={gapPx}
          min={min}
          max={max}
          markerColor={markerColor}
          renderCustomMarker={renderCustomMarker}
        />
        <Marker
          position="right"
          startPx={startPx}
          endPx={endPx}
          trackWidth={trackWidth}
          trackHeight={trackHeight}
          borderWidth={borderWidth}
          markerSize={markerSize}
          onChange={onChange}
          gapPx={gapPx}
          min={min}
          max={max}
          markerColor={markerColor}
          renderCustomMarker={renderCustomMarker}
        />
      </Animated.View>

      <View style={endBackdropViewStyle} />
    </GestureHandlerRootView>
  );
};

const S = StyleSheet.create({
  flex: {flex: 1, flexDirection: 'row'},
});
