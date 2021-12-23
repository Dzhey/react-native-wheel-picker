import {
  requireNativeComponent,
  UIManager,
  Platform,
  ViewStyle,
} from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-wheel-picker' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

type WheelPickerProps = {
  color: string;
  style: ViewStyle;
};

const ComponentName = 'WheelPickerView';

export const WheelPickerView =
  UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<WheelPickerProps>(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };
