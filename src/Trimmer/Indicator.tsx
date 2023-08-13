import React from 'react';
import {StyleSheet} from 'react-native';

import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Marker} from './Marker';
import {colors} from './styleConstants';

interface IndicatorProp {
  trackHeight: number;
  trackWidth: number;
  markerSize: number;
  borderWidth: number;
  onChange?: (start: number, end: number) => void;
  gap: number;
  startValue: number;
  endValue: number;
}

export const Indicator = ({
  trackHeight,
  trackWidth,
  markerSize,
  borderWidth,
  onChange,
  gap,
  startValue,
  endValue,
}: IndicatorProp) => {
  const startOffsetX = useSharedValue(0);
  const endOffsetX = useSharedValue(trackWidth);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      borderColor: 'plum',
      borderWidth: borderWidth,
      backgroundColor: colors.backdrop,
      height: trackHeight,
      position: 'absolute',
      left: startOffsetX.value,
      right: trackWidth - endOffsetX.value,
    };
  });

  return (
    <GestureHandlerRootView style={S.flex}>
      <Animated.View style={indicatorStyle}>
        <Marker
          position="left"
          offsetX={startOffsetX}
          trackWidth={trackWidth}
          trackHeight={trackHeight}
          borderWidth={borderWidth}
          markerSize={markerSize}
          onChange={onChange}
          otherOffsetX={endOffsetX}
          gap={gap}
          startValue={startValue}
          endValue={endValue}
        />
        <Marker
          position="right"
          offsetX={endOffsetX}
          trackWidth={trackWidth}
          trackHeight={trackHeight}
          borderWidth={borderWidth}
          markerSize={markerSize}
          onChange={onChange}
          otherOffsetX={startOffsetX}
          gap={gap}
          startValue={startValue}
          endValue={endValue}
        />
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const S = StyleSheet.create({
  flex: {flex: 1},
});
