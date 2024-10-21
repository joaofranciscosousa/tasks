import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import * as T from "./types";
import Icon from "react-native-vector-icons/FontAwesome";

const Button: React.FC<T.ButtonProps> = ({
  label,
  loading,
  labelStyle,
  style,
  icon,
  iconColor,
  iconSize,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, style]}
      onPress={loading ? undefined : props.onPress}
    >
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={"#000"} />
        </View>
      ) : (
        <>
          {icon && <Icon name={icon} size={iconSize} color={iconColor} />}
          {label && (
            <Text style={[styles.label, labelStyle]} numberOfLines={1}>
              {label}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "transparent",
    overflow: "hidden",
    maxWidth: "100%",
  },
  loadingContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  label: {
    flex: 1,
    textAlign: "center",
    fontWeight: "700",
  },
});
