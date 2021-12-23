'use strict';

import React from 'react';
import PropTypes from 'prop-types';
import {
  ColorPropType,
  Platform,
  requireNativeComponent,
  UIManager,
} from 'react-native';

const WheelPickerNativeInterface = {
  name: 'WheelPicker',
  propTypes: {
    data: PropTypes.array,
    textColor: ColorPropType,
    textSize: PropTypes.number,
    itemStyle: PropTypes.object,
    itemSpace: PropTypes.number,
    onValueChange: PropTypes.func,
    selectedValue: PropTypes.any,
    selectedIndex: PropTypes.number,
    curved: PropTypes.bool,
    indicator: PropTypes.bool,
    indicatorColor: PropTypes.any,
    indicatorSize: PropTypes.number,
  },
};

const LINKING_ERROR =
  `The package 'react-native-wheel-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

export const WheelPickerViewNative =
  UIManager.getViewManagerConfig('WheelPickerView') != null
    ? requireNativeComponent('WheelPickerView', WheelPickerNativeInterface)
    : () => {
        throw new Error(LINKING_ERROR);
      };

class WheelPickerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = this._stateFromProps(props);
  }

  static defaultProps = {
    itemStyle: { color: 'white', fontSize: 26 },
    itemSpace: 20,
  };

  UNSAFE_componentWillReceiveProps(props) {
    this.setState(this._stateFromProps(props));
  }

  _stateFromProps(props) {
    var selectedIndex = 0;
    var items = [];
    React.Children.forEach(props.children, function (child, index) {
      if (child.props.value === props.selectedValue) {
        selectedIndex = index;
      }
      items.push({ value: child.props.value, label: child.props.label });
    });

    var textSize = props.itemStyle.fontSize;
    var textColor = props.itemStyle.color;

    return { selectedIndex, items, textSize, textColor };
  }

  _onValueChange = (e) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(e.nativeEvent.data);
    }
  };

  render() {
    return (
      <WheelPickerViewNative
        {...this.props}
        onValueChange={this._onValueChange}
        data={this.state.items}
        textColor={this.state.textColor}
        textSize={this.state.textSize}
        selectedIndex={parseInt(this.state.selectedIndex)}
      />
    );
  }
}

class Item extends React.Component {
  render() {
    // These items don't get rendered directly.
    return null;
  }
}

WheelPickerView.propTypes = {
  data: PropTypes.array,
  textColor: ColorPropType,
  textSize: PropTypes.number,
  itemStyle: PropTypes.object,
  itemSpace: PropTypes.number,
  onValueChange: PropTypes.func,
  selectedValue: PropTypes.any,
  selectedIndex: PropTypes.number,
  lineColor: PropTypes.any,
  lineGradientColorFrom: PropTypes.any,
  lineGradientColorTo: PropTypes.any,
};

Item.propTypes = {
  value: PropTypes.any, // string or integer basically
  label: PropTypes.string,
};

WheelPickerView.Item = Item;

module.exports = WheelPickerView;
