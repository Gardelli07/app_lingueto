import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useTheme, useThemedStyles } from "../theme";

import Home from "../pages/Home";
import Comunidade from "../pages/Comunidade";
import Profile from "../pages/Profile";
import HomeSantander from "../pages/santander";

import { useAuth } from "../context/AuthContext";
import { Empresas } from "../util/images";
import ButtonSantander from "./Empresas/ButtonSantander";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
  const { user } = useAuth();
  const insets = useSafeAreaInsets();
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const bottomInset = Math.max(insets.bottom, 8);
  const isSantander = user?.empresa?.toLowerCase() === "santander";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: CORES.SCREEN_BG,
          height: 52 + bottomInset,
          paddingTop: 2,
          paddingBottom: bottomInset,
        },

        tabBarBackground: () => (
          <View style={styles.tabBarBackground}>
            <View
              style={[
                styles.tabBarMainBackground,
                { bottom: bottomInset > 0 ? bottomInset : 0 },
              ]}
            />
            <View
              style={[
                styles.nativeButtonsBackground,
                { height: bottomInset > 0 ? bottomInset : 0 },
              ]}
            />
          </View>
        ),
        tabBarItemStyle: {
          paddingVertical: 0,
        },

        tabBarActiveTintColor: CORES.ON_ACCENT,
        tabBarInactiveTintColor: CORES.mode === "dark" ? "rgba(245,246,252,0.55)" : "#000000aa",
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 11,
          lineHeight: 12,
          marginTop: -1,
          marginBottom: 0,
        },

        tabBarIcon: ({ color, size }) => {
          const icons = {
            Home: "home",
            Comunidade: "comment",
            Perfil: "account",
          };

          if (!icons[route.name]) return null;

          return (
            <MaterialCommunityIcons
              name={icons[route.name]}
              size={size ?? 26}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Comunidade" component={Comunidade} />
      <Tab.Screen name="Perfil" component={Profile} />

      {isSantander && (
        <Tab.Screen
          name="HomeSantander"
          component={HomeSantander}
          options={{
            tabBarLabel: "",
            tabBarButton: (props) => (
              <ButtonSantander
                {...props}
                bottomInset={bottomInset}
                source={Empresas.logoSantander}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    tabBarBackground: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    tabBarMainBackground: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      backgroundColor: CORES.PRIMARY,
      borderTopWidth: 1.5,
      borderTopColor: CORES.mode === "dark" ? CORES.BORDER : "#ffffff",
    },
    nativeButtonsBackground: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: CORES.SCREEN_BG,
    },
  });
