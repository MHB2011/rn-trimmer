import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Trimmer} from './Trimmer';
import {colors} from './Trimmer/styleConstants';

export const App = () => {
  const [startValue, setStartValue] = React.useState(0);
  const [endValue, setEndValue] = React.useState(10000);

  return (
    <SafeAreaView style={S.flex}>
      <View style={[S.flex, S.container]}>
        <Trimmer
          min={900}
          max={100000}
          startValue={startValue}
          endValue={endValue}
          markerSize={24}
          height={50}
          borderWidth={4}
          onChange={(start, end) => {
            setStartValue(Math.round(start));
            setEndValue(Math.round(end));
            console.log('start', Math.round(start));
            console.log('end', Math.round(end));
          }}
          gapPx={50}
        />
        <Text>{`start: ${startValue}, end: ${endValue}`}</Text>
      </View>

      {/* <View style={{height: 100}} /> */}
    </SafeAreaView>
  );
};

const S = StyleSheet.create({
  flex: {flex: 1},
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.lighter,
    paddingVertical: 32,
  },
});
