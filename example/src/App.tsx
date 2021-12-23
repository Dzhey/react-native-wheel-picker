import * as React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import WheelPickerView from 'react-native-wheel-picker';
import { useMemo, useState } from 'react';

export default function App() {
  const [selectedValue, setSelectedValue] = useState(0);

  const data = useMemo(() => {
    return Array.from(Array(100).keys()).map((i) => {
      return { value: i, label: `${i}` };
    });
  }, []);

  return (
    <View style={styles.container}>
      <WheelPickerView<number>
        style={styles.picker}
        indicator
        curved
        indicatorColor={'lightgrey'}
        indicatorSize={2}
        itemStyle={styles.itemStyle}
        onValueChange={setSelectedValue}
      >
        {data.map((entry) => (
          <WheelPickerView.Item
            key={entry.value}
            value={entry.value}
            label={entry.label}
          />
        ))}
      </WheelPickerView>
      <Text>
        {`Selected: ${selectedValue}`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: 200,
    height: 200,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  itemStyle: {
    color: 'black',
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'left',
  },
});
