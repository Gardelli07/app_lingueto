import * as React from "react";
import { Image, TouchableOpacity, BackHandler, StyleSheet } from "react-native";
import {
  DarkTheme as NavDarkTheme,
  DefaultTheme as NavDefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Appbar } from "react-native-paper";
import { useTheme, useThemeMode } from "../theme";

import TabsNavigator from "./TabsNavigator";

/* ===== PÁGINAS ===== */
// padrão
import SplashScreen from "../pages/SplashScreen";
import Login from "../pages/Login";
import OnboardingScreen from "../pages/onboarding/OnboardingScreen";
import MeusErros from "../pages/MeusErros";
import PaywallScreen from "../pages/PaywallScreen";
import PerfilVisitado from "../pages/PerfilVisitado";
import Amigos from "../pages/Amigos";
import Notificacoes from "../pages/Notificacoes";
import Desafios from "../pages/Desafios";
import ProfessorLingueto from "../pages/ProfessorLingueto";
import InglesCompletoHome, { lessonScreens as inglesCompletoA0A1LessonScreens } from "../pages/aulas/completo/A0-A1";
import InglesCompletoA2Home, { lessonScreens as inglesCompletoA2LessonScreens } from "../pages/aulas/completo/A2";
import InglesCompletoB1Home, { lessonScreens as inglesCompletoB1LessonScreens } from "../pages/aulas/completo/B1";
import BussinesHome, { lessonScreens as bussinesA1LessonScreens } from "../pages/aulas/bussines/A1";
import BussinesB1Home, { lessonScreens as bussinesB1LessonScreens } from "../pages/aulas/bussines/B1";
import TravelHome, { lessonScreens as travelA1LessonScreens } from "../pages/aulas/viagem/A1";
import ExpressionsHome, { lessonScreens as expressionsA0A1LessonScreens } from "../pages/aulas/expressions/A0-A1";
import GrammarLabHome, { lessonScreens as grammarLabA0A1LessonScreens } from "../pages/aulas/grammarlab/A0-A1";
import StoryModeHome, { StoryModeA2Home } from "../pages/aulas/storymode/StoryModeHome";
import { lessonScreens as storyModeA0A1LessonScreens } from "../pages/aulas/storymode/A0-A1";
import { lessonScreens as storyModeA2LessonScreens } from "../pages/aulas/storymode/A2";
import ListeningHome, { lessonScreens as listeningA0A1LessonScreens } from "../pages/aulas/listening/A0-A1";
import PronunciationHome, { lessonScreens as pronunciationA0A1LessonScreens } from "../pages/aulas/pronunciation/A0-A1";
import BusinessHome, { lessonScreens as businessA0A1LessonScreens } from "../pages/aulas/business/A0-A1";
import TravelNewHome, { lessonScreens as travelNewA0A1LessonScreens } from "../pages/aulas/travel/A0-A1";
import FloridaTopicsScreen from "../pages/aulas/travel/florida/FloridaTopicsScreen";
import FloridaClassesScreen from "../pages/aulas/travel/florida/FloridaClassesScreen";
import MarketingTopicsScreen from "../pages/aulas/business/marketing/MarketingTopicsScreen";
import MarketingClassesScreen from "../pages/aulas/business/marketing/MarketingClassesScreen";
import BusinessA2Home, { lessonScreens as businessA2LessonScreens } from "../pages/aulas/business/A2";
import AulasPlusHome, {
  lessonScreens as aulasPlusLessonScreens,
} from "../pages/aulas/aulasplus";
import AulasPlusSeriesDetail from "../pages/aulas/aulasplus/AulasPlusSeriesDetail";

// Business

// Completo

// Santander
import HomeSantander from "../pages/santander";
import HomeCRM from "../pages/santander/crm/HomeCRM";
import CRM1 from "../pages/santander/crm/CRM1";

const Stack = createNativeStackNavigator();

function renderLessonScreens(lessonScreens) {
  return Object.entries(lessonScreens).map(([screenName, Screen]) => (
    <Stack.Screen
      key={screenName}
      name={screenName}
      component={Screen}
      options={{ headerShown: false }}
    />
  ));
}

/* ================= STACK NAVIGATOR ================= */
export default function Routes() {
  const navigationRef = React.useRef();
  const CORES = useTheme();
  const { isDark } = useThemeMode();

  /* ===== HEADER PADRÃO ===== */
  const defaultHeader = {
    headerStyle: { backgroundColor: CORES.PRIMARY },
    headerTintColor: CORES.ON_ACCENT,
  };

  // Tema do react-navigation: define o fundo das telas e das transicoes,
  // evitando o flash branco entre telas quando o app esta no modo escuro.
  const navTheme = React.useMemo(() => {
    const base = isDark ? NavDarkTheme : NavDefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: CORES.SCREEN_BG,
        card: CORES.SURFACE,
        text: CORES.TEXT,
        border: CORES.BORDER,
        primary: CORES.PRIMARY,
      },
    };
  }, [isDark, CORES]);

  React.useEffect(() => {
    const onBackPress = () => {
      const current = navigationRef.current?.getCurrentRoute?.();
      if (current?.name === "Bussines" || current?.name === "MeusErros") {
        navigationRef.current.navigate("Tabs", { screen: "Home" });
        return true;
      }
      return false;
    };

    const sub = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => sub.remove();
  }, []);

  return (
    <NavigationContainer ref={navigationRef} theme={navTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ contentStyle: { backgroundColor: CORES.SCREEN_BG } }}
      >
        {/* ===== TABS ===== */}
        <Stack.Screen
          name="Tabs"
          component={TabsNavigator}
          options={({ navigation }) => ({
            header: () => (
              <Appbar.Header
                style={{
                  // cor do tema so aparece enquanto o banner carrega
                  backgroundColor: CORES.PRIMARY,
                  height: 55,
                  paddingHorizontal: 10,
                  overflow: "hidden",
                }}
              >
                {/* stretch: o header e bem mais largo que a imagem, e com cover
                    ela era ampliada e cortada em vez de aparecer inteira */}
                <Image
                  source={require("../../assets/Home/background-header.png")}
                  style={StyleSheet.absoluteFill}
                  resizeMode="stretch"
                />
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Tabs", { screen: "Home" })
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../../assets/lingueto-wordmark-white.png")}
                    style={{
                      width: 128,
                      height: 34,
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </Appbar.Header>
            ),
          })}
        />

        {/* ===== BUSINESS ===== */}
        <Stack.Screen
          name="Bussines"
          component={BussinesHome}
          options={{
            title: "Business English",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(bussinesA1LessonScreens)}
        <Stack.Screen
          name="BussinesB1"
          component={BussinesB1Home}
          options={{
            title: "Business English B1",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(bussinesB1LessonScreens)}

        {/* ===== TRAVEL ===== */}
        <Stack.Screen
          name="TravelEnglish"
          component={TravelHome}
          options={{
            title: "Ingles para viagem",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(travelA1LessonScreens)}

        {/* ===== COMPLETO ===== */}
        <Stack.Screen
          name="Inglescompleto"
          component={InglesCompletoHome}
          options={{
            title: "Inglês Completo",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InglescompletoA2"
          component={InglesCompletoA2Home}
          options={{
            title: "Inglês Completo A2",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="InglescompletoB1"
          component={InglesCompletoB1Home}
          options={{
            title: "Inglês Completo B1",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(inglesCompletoB1LessonScreens)}
        {renderLessonScreens(inglesCompletoA2LessonScreens)}

        {renderLessonScreens(inglesCompletoA0A1LessonScreens)}

        {/* ===== EXPRESSIONS ===== */}
        <Stack.Screen
          name="Expressions"
          component={ExpressionsHome}
          options={{
            title: "Expressions",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(expressionsA0A1LessonScreens)}

        {/* ===== LISTENING ===== */}
        <Stack.Screen
          name="Listening"
          component={ListeningHome}
          options={{
            title: "Listening",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(listeningA0A1LessonScreens)}

        {/* ===== PRONUNCIATION LAB ===== */}
        <Stack.Screen
          name="Pronunciation"
          component={PronunciationHome}
          options={{
            title: "Pronunciation Lab",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(pronunciationA0A1LessonScreens)}

        {/* ===== BUSINESS (tile da Home; o "Bussines English" antigo fica acima) ===== */}
        <Stack.Screen
          name="Business"
          component={BusinessHome}
          options={{
            title: "Business",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketingTopics"
          component={MarketingTopicsScreen}
          options={{
            title: "Marketing",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MarketingClasses"
          component={MarketingClassesScreen}
          options={{
            title: "Marketing",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(businessA0A1LessonScreens)}
        <Stack.Screen
          name="BusinessA2"
          component={BusinessA2Home}
          options={{
            title: "Business A2",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(businessA2LessonScreens)}

        {/* ===== VIAGEM (tile da Home; o "Ingles para viagem" antigo e o TravelEnglish) ===== */}
        <Stack.Screen
          name="Travel"
          component={TravelNewHome}
          options={{
            title: "Viagem",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FloridaTopics"
          component={FloridaTopicsScreen}
          options={{
            title: "My Trip to Florida",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FloridaClasses"
          component={FloridaClassesScreen}
          options={{
            title: "My Trip to Florida",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(travelNewA0A1LessonScreens)}

        {/* ===== GRAMMAR LAB ===== */}
        <Stack.Screen
          name="GrammarLab"
          component={GrammarLabHome}
          options={{
            title: "Grammar Lab",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(grammarLabA0A1LessonScreens)}

        {/* ===== STORY MODE ===== */}
        <Stack.Screen
          name="StoryMode"
          component={StoryModeHome}
          options={{
            title: "Story Mode",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(storyModeA0A1LessonScreens)}
        <Stack.Screen
          name="StoryModeA2"
          component={StoryModeA2Home}
          options={{
            title: "Story Mode A2",
            ...defaultHeader,
            headerShown: false,
          }}
        />
        {renderLessonScreens(storyModeA2LessonScreens)}

        {/* ===== AULAS PLUS ===== */}
        <Stack.Screen
          name="AulasPlusHome"
          component={AulasPlusHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AulasPlusSeriesDetail"
          component={AulasPlusSeriesDetail}
          options={{ headerShown: false }}
        />
        {renderLessonScreens(aulasPlusLessonScreens)}

        {/* ===== SANTANDER ===== */}
        <Stack.Screen
          name="HomeSantander"
          component={HomeSantander}
          options={{
            title: "área Santander",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        <Stack.Screen
          name="HomeCRM"
          component={HomeCRM}
          options={{
            title: "CRM",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        <Stack.Screen
          name="CRM1"
          component={CRM1}
          options={{
            title: "CRM",
            headerStyle: { backgroundColor: "#EC0000" },
            headerTintColor: "#F3F4F6",
          }}
        />

        {/* ===== AUTENTICAÇÃO ===== */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MeusErros"
          component={MeusErros}
          options={{ headerShown: false }}
        />

        {/* ===== COMUNIDADE SOCIAL ===== */}
        <Stack.Screen
          name="PerfilVisitado"
          component={PerfilVisitado}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Amigos"
          component={Amigos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notificacoes"
          component={Notificacoes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Desafios"
          component={Desafios}
          options={{ headerShown: false }}
        />

        {/* ===== PROFESSOR LINGUETO (chat com IA) ===== */}
        <Stack.Screen
          name="ProfessorLingueto"
          component={ProfessorLingueto}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
