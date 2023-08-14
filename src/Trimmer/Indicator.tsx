import React from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Marker} from './Marker';
import {colors} from './styleConstants';

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
}: IndicatorProp) => {
  const startPx = interpolate(startValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP,
  });
  const endPx = interpolate(endValue, [min, max], [0, trackWidth], {
    extrapolateLeft: Extrapolate.CLAMP,
    extrapolateRight: Extrapolate.CLAMP,
  });

  console.log('startPx', startPx, 'endPx', endPx);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      borderColor: 'plum',
      borderWidth: borderWidth,
      backgroundColor: colors.backdrop,
      height: trackHeight,
      position: 'absolute',
      left: startPx,
      right: trackWidth - endPx,
    };
  });

  return (
    <GestureHandlerRootView style={S.flex}>
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
        />
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const S = StyleSheet.create({
  flex: {flex: 1},
});
