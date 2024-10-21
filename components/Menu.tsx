import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { DrawerNavigationState, ParamListBase } from "@react-navigation/native";
import { Avatar } from "@rneui/themed";
import commonStyles from "@/assets/styles/commonStyles";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from "@react-navigation/drawer/lib/typescript/src/types";
import useAuth from "@/store/auth";
import { router } from "expo-router";

export default function Menu(
  props: React.JSX.IntrinsicAttributes & {
    state: DrawerNavigationState<ParamListBase>;
    navigation: DrawerNavigationHelpers;
    descriptors: DrawerDescriptorMap;
  }
) {
  const { data } = useAuth();

  const logout = () => {
    delete axios.defaults.headers.common["Authorization"];
    AsyncStorage.removeItem("@token");
    router.push("/");
  };

  return (
    <DrawerContentScrollView>
      <View style={styles.header}>
        <Avatar
          size={60}
          rounded
          title={data.name[0].toUpperCase()}
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.email}>{data.email}</Text>
        </View>
        <TouchableOpacity onPress={logout}>
          <View style={styles.logoutIcon}>
            <Icon name="sign-out" size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
    padding: 10,
  },
  avatar: {
    borderWidth: 3,
    margin: 10,
    backgroundColor: "#222",
  },
  userInfo: {
    // marginLeft: 10,
    marginTop: 30,
  },
  name: {
    // fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    color: commonStyles.colors.mainText,
    marginBottom: 5,
  },
  email: {
    // fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    color: commonStyles.colors.subText,
    marginBottom: 10,
  },
  logoutIcon: {
    // marginLeft: 10,
    marginBottom: 10,
  },
});
