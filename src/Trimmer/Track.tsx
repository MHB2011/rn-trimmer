import React, {PropsWithChildren, useMemo, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from './styleConstants';

interface TrackProps {
  height: number;
  renderIndicator: (trackWidth: number) => JSX.Element;
  trackColor?: string;
  imageBackgroundSource?: ImageSourcePropType;
  imageStyle?: StyleProp<ImageStyle>;
}

export const Track = ({
  renderIndicator,
  height,
  trackColor,
  imageBackgroundSource,
  imageStyle,
}: PropsWithChildren<TrackProps>) => {
  const [trackWidth, setTrackWidth] = useState(0);

  const style: ViewStyle = useMemo(() => {
    return {
      backgroundColor: imageBackgroundSource ? colors.transparent : trackColor,
      flexDirection: 'row',
      height,
    };
  }, [height, imageBackgroundSource, trackColor]);

  return (
    <View>
      <View
        onLayout={event => {
          try {
            const width = event.nativeEvent.layout.width;
            setTrackWidth(width);
          } catch (error) {
            console.log('Error in onLayout', String(error));
          }
        }}
        style={style}>
        {trackWidth !== 0 && renderIndicator(trackWidth)}
      </View>
      {imageBackgroundSource && (
        <View style={S.imageContainer}>
          <Image
            source={imageBackgroundSource}
            style={imageStyle ? imageStyle : S.image}
          />
        </View>
      )}
    </View>
  );
};

const S = StyleSheet.create({
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -100,
  },
  image: {width: '100%', height: '100%', resizeMode: 'repeat'},
});
