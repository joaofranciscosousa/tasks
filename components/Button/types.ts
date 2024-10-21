import { StyleProp, TextStyle, TouchableOpacityProps } from "react-native";

export type ButtonProps = TouchableOpacityProps & {
  label?: string;
  loading?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
};
