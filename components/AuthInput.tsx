import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

interface AuthInput {
  icon: string;
  style: Object;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  secureTextEntry?: boolean;
}

export default function AuthInput({
  icon,
  style,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}: AuthInput) {
  return (
    <View style={[styles.container, style]}>
      <Icon name={icon} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={(newValue) => onChangeText(newValue)}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 40,
    backgroundColor: "#EEE",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#333",
    marginLeft: 20,
  },
  input: {
    marginLeft: 20,
    width: "70%",
  },
});
