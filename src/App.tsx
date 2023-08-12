import React, {PropsWithChildren, useMemo, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import {colors} from './styleConstants';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'; // wraps react-native core components

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView style={backgroundStyle}>
        <View style={S.container}>
          <Trimmer height={50} markerSize={24} borderWidth={3} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface TrimmerProps {
  height?: number;
  markerSize?: number;
  borderWidth?: number;
}

const Trimmer = ({
  height = 50,
  markerSize = 24,
  borderWidth = 2,
}: TrimmerProps) => {
  return (
    <Track
      height={height}
      render={(trackWidth: number) => {
        return (
          <Indicator
            trackHeight={height}
            trackWidth={trackWidth}
            markerSize={markerSize}
            borderWidth={borderWidth}
          />
        );
      }}
    />
  );
};

interface TrackProps {
  height: number;
  render: (trackWidth: number) => JSX.Element;
}

const Track = ({render, height}: PropsWithChildren<TrackProps>) => {
  const [trackWidth, setTrackWidth] = useState(0);

  return (
    <View
      onLayout={event => {
        try {
          const width = event.nativeEvent.layout.width;
          setTrackWidth(width);
        } catch (error) {
          console.log('Error in onLayout', String(error));
        }
      }}
      style={[S.track, {height}]}>
      {trackWidth !== 0 && render(trackWidth)}
    </View>
  );
};

interface IndicatorProp {
  trackHeight: number;
  trackWidth: number;
  markerSize: number;
  borderWidth: number;
}

const Indicator = ({
  trackHeight,
  trackWidth,
  markerSize,
  borderWidth,
}: IndicatorProp) => {
  const offsetX = useSharedValue(0);
  const width = useSharedValue(trackWidth);

  const leftMarkerStyle = useMemo(() => {
    return getMarkerStyle({
      position: 'left',
      trackHeight,
      markerSize,
      borderWidth,
    });
  }, [borderWidth, markerSize, trackHeight]);
  const rightMarkerStyle = useMemo(() => {
    return getMarkerStyle({
      position: 'right',
      trackHeight,
      markerSize,
      borderWidth,
    });
  }, [borderWidth, markerSize, trackHeight]);

  const handlePressLeft = () => {
    if (offsetX.value === 100) {
      offsetX.value = withTiming(0, {duration: 1000});
      return;
    }

    offsetX.value = withTiming(100, {duration: 1000});
  };

  const handlePressRight = () => {
    if (width.value === 200) {
      width.value = withTiming(10, {duration: 1000});
      return;
    }

    width.value = withTiming(200, {duration: 1000});
  };

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      borderWidth: borderWidth,
      transform: [{translateX: offsetX.value}],
      width: width.value - offsetX.value,
    };
  });

  return (
    <>
      <Animated.View style={[S.indicator, indicatorStyle]}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={handlePressLeft} style={leftMarkerStyle} />
          <TouchableOpacity
            onPress={handlePressRight}
            style={rightMarkerStyle}
          />
        </View>
      </Animated.View>
    </>
  );
};

const getMarkerStyle = ({
  position,
  trackHeight,
  markerSize,
  borderWidth,
}: {
  position: 'left' | 'right';
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

const S = StyleSheet.create({
  animatedContainer: {
    backgroundColor: colors.primary,
    width: 100,
    height: 100,
  },
  indicator: {
    borderColor: 'red',
  },
  track: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
  container: {
    backgroundColor: colors.white,
    padding: 16,
  },
});

export default App;
