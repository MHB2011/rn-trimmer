import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

import {Trimmer} from './Trimmer';
import {colors} from './Trimmer/styleConstants';

export const App = () => {
  const [startValue, setStartValue] = React.useState(0);
  const [endValue, setEndValue] = React.useState(1000);

  return (
    <SafeAreaView style={S.flex}>
      <View style={[S.flex, S.container]}>
        {/*  Treba li ovo biti kontrolirana komponenta
        i ako da , kako to izvesti xD */}
        <Trimmer
          startValue={0}
          endValue={1000}
          markerSize={100}
          onChange={(start, end) => {
            setStartValue(Math.round(start));
            setEndValue(Math.round(end));
            console.log('start', Math.round(start));
            console.log('end', Math.round(end));
          }}
          gapPx={50}
        />

        <View>
          <Text>{`start: ${startValue}, end: ${endValue}`}</Text>
        </View>
      </View>
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
