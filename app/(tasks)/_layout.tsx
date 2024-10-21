import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import TaskList from "./List";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Menu from "@/components/Menu";
const Drawer = createDrawerNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
          }}
          drawerContent={(props) => <Menu {...props} />}
        >
          <Drawer.Screen
            name="Today"
            options={{ title: "Hoje", unmountOnBlur: true }}
          >
            {(props) => <TaskList {...props} title="Hoje" daysAhead={0} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Tomorrow"
            options={{ title: "Amanhã", unmountOnBlur: true }}
          >
            {(props) => <TaskList {...props} title="Amanhã" daysAhead={1} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Week"
            options={{ title: "Semana", unmountOnBlur: true }}
          >
            {(props) => <TaskList {...props} title="Semana" daysAhead={7} />}
          </Drawer.Screen>
          <Drawer.Screen
            name="Month"
            options={{ title: "Mês", unmountOnBlur: true }}
          >
            {(props) => <TaskList {...props} title="Mês" daysAhead={30} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
