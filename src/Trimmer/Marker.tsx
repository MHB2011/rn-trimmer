import React, {useMemo} from 'react';
import {View, ViewStyle} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {interpolate, runOnJS, useSharedValue} from 'react-native-reanimated';

interface MarkerProps {
  position: Position;
  startPx: number; // current start marker X position in px
  endPx: number; // current end marker X position in px
  gapPx: number; // gap between markers in px
  min: number; // users units e.g. 0-1000
  max: number; // users units e.g. 0-1000
  trackWidth: number;
  trackHeight: number;
  markerSize: number;
  borderWidth: number;
  onChange?: (start: number, end: number) => void;
  markerColor: string;
  renderCustomMarker?: (position: Position) => React.ReactNode;
}

export const Marker = ({
  startPx,
  endPx,
  trackWidth,
  position,
  markerSize,
  borderWidth,
  trackHeight,
  gapPx,
  onChange,
  min,
  max,
  markerColor,
  renderCustomMarker,
}: MarkerProps) => {
  const startX = useSharedValue(position === 'left' ? startPx : endPx);

  const markerStyle = useMemo(() => {
    return getMarkerStyle({
      position: position,
      trackHeight,
      markerSize,
      borderWidth,
      markerColor,
    });
  }, [borderWidth, markerColor, markerSize, position, trackHeight]);

  function onUpdate(translationX: number) {
    'worklet';

    const newOffsetX = startX.value + translationX;

    const minValue = position === 'left' ? 0 : startPx + gapPx;
    const maxValue = position === 'left' ? endPx - gapPx : trackWidth;

    const clampX = Math.min(Math.max(newOffsetX, minValue), maxValue);

    function getInterpolatedValue(value: number) {
      return interpolate(value, [0, trackWidth], [min, max]);
    }

    if (!onChange) {
      return;
    }
    if (position === 'left') {
      runOnJS(onChange)(
        getInterpolatedValue(clampX),
        getInterpolatedValue(endPx),
      );
    } else {
      runOnJS(onChange)(
        getInterpolatedValue(startPx),
        getInterpolatedValue(clampX),
      );
    }
  }

  function onEnd() {
    'worklet';

    startX.value = position === 'left' ? startPx : endPx;
  }

  const gesture = Gesture.Pan()
    .minDistance(0)
    .onUpdate(e => {
      onUpdate(e.translationX);
    })
    .onEnd(onEnd);

  const customMarkerContainerStyle = getCustomMarkerContainerStyle(position);

  return (
    <GestureDetector gesture={gesture}>
      {renderCustomMarker ? (
        <View style={customMarkerContainerStyle}>
          {renderCustomMarker(position)}
        </View>
      ) : (
        <View style={markerStyle} />
      )}
    </GestureDetector>
  );
};

export type Position = 'left' | 'right';

const getCustomMarkerContainerStyle = (position: Position): ViewStyle => {
  return position === 'left'
    ? {
        position: 'absolute',
        left: 0,
      }
    : {
        position: 'absolute',
        right: 0,
      };
};

const getMarkerStyle = ({
  position,
  markerSize,
  borderWidth,
  trackHeight,
  markerColor,
}: {
  position: Position;
  markerSize: number;
  borderWidth: number;
  trackHeight: number;
  markerColor: string;
}): ViewStyle => {
  const sharedStyle: ViewStyle = {
    position: 'absolute',
    backgroundColor: markerColor,
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
