import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Trimmer} from './Trimmer';

export const App = () => {
  const [startValue, setStartValue] = React.useState(0);
  const [endValue, setEndValue] = React.useState(10000);

  return (
    <SafeAreaView style={S.flex}>
      <View style={[S.flex, S.container]}>
        <Trimmer
          min={0}
          max={500}
          startValue={startValue}
          endValue={endValue}
          backdropColor="rgba(54, 45, 53, 0.682)"
          imageBackgroundSource={{
            uri: 'https://loremflickr.com/cache/resized/65535_52750893698_5b1c16297f_q_100_120_nofilter.jpg',
          }}
          onChange={(start, end) => {
            setStartValue(Math.round(start));
            setEndValue(Math.round(end));
            console.log('start', Math.round(start));
            console.log('end', Math.round(end));
          }}
        />
        <Text>{`start: ${startValue}, end: ${endValue}`}</Text>
      </View>
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  flex: {flex: 1},
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
  },
});
