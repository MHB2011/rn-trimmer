import React, {PropsWithChildren, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {colors} from './styleConstants';

interface TrackProps {
  height: number;
  renderIndicator: (trackWidth: number) => JSX.Element;
}

export const Track = ({
  renderIndicator,
  height,
}: PropsWithChildren<TrackProps>) => {
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
      {trackWidth !== 0 && renderIndicator(trackWidth)}
    </View>
  );
};

const S = StyleSheet.create({
  track: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
  },
});
