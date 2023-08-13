import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  SharedValue,
  interpolate,
  runOnJS,
  useSharedValue,
} from 'react-native-reanimated';

interface MarkerProps {
  offsetX: SharedValue<number>;
  trackWidth: number;
  position: Position;
  trackHeight: number;
  markerSize: number;
  borderWidth: number;
  onChange?: (start: number, end: number) => void;
  otherOffsetX: SharedValue<number>;
  gapPx: number;
  startValue: number;
  endValue: number;
}

export const Marker = ({
  offsetX,
  trackWidth,
  position,
  markerSize,
  borderWidth,
  trackHeight,
  onChange,
  otherOffsetX,
  gapPx,
  startValue,
  endValue,
}: MarkerProps) => {
  const startX = useSharedValue(position === 'left' ? 0 : trackWidth);

  const markerStyle = useMemo(() => {
    return getMarkerStyle({
      position: position,
      trackHeight,
      markerSize,
      borderWidth,
    });
  }, [borderWidth, markerSize, position, trackHeight]);

  function onUpdate(translationX: number) {
    'worklet';
    const newOffsetX = startX.value + translationX;

    const min = position === 'left' ? 0 : otherOffsetX.value + gapPx;
    const max = position === 'left' ? otherOffsetX.value - gapPx : trackWidth;

    const clampX = Math.min(Math.max(newOffsetX, min), max);

    offsetX.value = clampX;

    function getInterpolatedValue(value: number) {
      return interpolate(value, [0, trackWidth], [startValue, endValue]);
    }

    if (!onChange) {
      return;
    }
    if (position === 'left') {
      runOnJS(onChange)(
        getInterpolatedValue(offsetX.value),
        getInterpolatedValue(otherOffsetX.value),
      );
    } else {
      runOnJS(onChange)(
        getInterpolatedValue(otherOffsetX.value),
        getInterpolatedValue(offsetX.value),
      );
    }
  }

  function onEnd() {
    'worklet';

    startX.value = offsetX.value;
  }

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onUpdate(e => {
      onUpdate(e.translationX);
    })
    .onEnd(onEnd);

  return (
    <GestureDetector gesture={gesture}>
      <View style={markerStyle} />
    </GestureDetector>
  );
};

export type Position = 'left' | 'right';

const getMarkerStyle = ({
  position,
  trackHeight,
  markerSize,
  borderWidth,
}: {
  position: Position;
  trackHeight: number;
  markerSize: number;
  borderWidth: number;
}): ViewStyle => {
  const sharedStyle: ViewStyle = {
    position: 'absolute',
    backgroundColor: 'plum',
    top: (trackHeight - 2 * borderWidth - markerSize) / 2,
    width: markerSize,
    height: markerSize,
    borderRadius: markerSize / 2,
  };

  return position === 'left'
    ? {
        ...sharedStyle,
        left: -((markerSize + borderWidth) / 2),
      }
    : {
        ...sharedStyle,
        right: -((markerSize + borderWidth) / 2),
      };
};
