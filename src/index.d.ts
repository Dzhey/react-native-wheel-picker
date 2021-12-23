import React from 'react';
import type { ColorValue, StyleProp, TextStyle, ViewProps } from 'react-native';

export interface PickerItemProps<ItemValue> {
  label?: string;
  value: ItemValue;
  color?: ColorValue;
  testID?: string;
}

export interface PickerProps<ItemValue> extends ViewProps {
  /**
   * @platform android
   */
  data?: any[];
  /**
   * @platform android
   */
  enabled?: boolean;
  /**
   * @platform android
   */
  curved?: boolean;
  /**
   * @platform android
   */
  itemSpace?: number;
  itemStyle?: StyleProp<TextStyle>;
  /**
   * to set top and bottom line color
   */
  indicator?: boolean;
  indicatorColor?: ColorValue;
  indicatorSize?: number;
  /**
   * to set top and bottom starting gradient line color
   */
  lineGradientColorFrom?: ColorValue;
  /**
   * to set top and bottom ending gradient
   */
  lineGradientColorTo?: ColorValue;
  onValueChange?: (itemValue: ItemValue) => void;
  selectedIndex?: number;
  selectedValue?: ItemValue;
  style?: StyleProp<TextStyle>;
  /**
   * Used for end-to-end tests
   */
  testID?: string;
  /**
   * @platform android
   */
  textColor?: ColorValue;
  /**
   * @platform android
   */
  textSize?: number;
}

export default class Picker<ItemValue> extends React.Component<
  PickerProps<ItemValue>,
  {}
> {
  // @ts-ignore
  static Item: React.ComponentType<PickerItemProps<ItemValue>>;
}
