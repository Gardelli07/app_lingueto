import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AppleAuthentication from "expo-apple-authentication";

import { useAuth } from "../context/AuthContext";
import api, { setTokens } from "../services/api";
import { requestNotificationPermission } from "../services/notifications";
import { useTheme, useThemeMode, useThemedStyles } from "../theme";

WebBrowser.maybeCompleteAuthSession();

function getHomeRouteByEmpresa(empresa) {
  if (!empresa) return "Home";
  const formatted =
    empresa.charAt(0).toUpperCase() + empresa.slice(1).toLowerCase();
  return `Home${formatted}`;
}

export default function LoginScreen({ navigation }) {
  const CORES = useTheme();
  const { isDark } = useThemeMode();
  const styles = useThemedStyles(makeStyles);
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [corpOpen, setCorpOpen] = useState(false);
  const [socialLoading, setSocialLoading] = useState(false);

  const [googleRequest, googleResponse, googlePromptAsync] =
    Google.useAuthRequest({
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    });

  useEffect(() => {
    if (googleResponse?.type === "success") {
      const idToken = googleResponse.params?.id_token;
      if (idToken) {
        handleSocialLogin("google", { idToken, plataforma: Platform.OS });
      } else {
        setSocialLoading(false);
        Alert.alert("Erro", "Não foi possível obter o token do Google.");
      }
    } else if (googleResponse) {
      // usuário cancelou ou o provider retornou erro antes de chegar no backend
      setSocialLoading(false);
    }
  }, [googleResponse]);

  async function handleGooglePress() {
    setSocialLoading(true);
    try {
      const result = await googlePromptAsync();
      if (result?.type !== "success") {
        setSocialLoading(false);
      }
    } catch (error) {
      setSocialLoading(false);
    }
  }

  function toggleCorp() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCorpOpen((v) => !v);
  }

  function goToNextScreen(userData, empresa) {
    if (userData?.teste_nivelamento_concluido) {
      const homeRoute = getHomeRouteByEmpresa(empresa);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Tabs",
            state: { routes: [{ name: homeRoute }] },
          },
        ],
      });
      return;
    }

    navigation.reset({
      index: 0,
      routes: [{ name: "PlacementFlow" }],
    });
  }

  async function handleSocialLogin(provider, tokenPayload) {
    try {
      const endpoint = provider === "google" ? "/auth/google" : "/auth/apple";
      const response = await api.post(endpoint, tokenPayload, {
        authenticated: false,
      });

      const payload = response?.dados || response?.data || response;
      const userData = payload?.usuario || payload?.user || payload;
      const token = payload?.access_token || payload?.token;
      const refreshToken = payload?.refresh_token;
      const company =
        userData?.empresa?.codigo ||
        userData?.empresa_codigo ||
        userData?.empresa;
      const empresa =
        typeof company === "string" ? company.toLowerCase() : company;

      if (token) {
        await setTokens({ access_token: token, refresh_token: refreshToken });
      }

      signIn({
        ...userData,
        tipo: userData?.perfil || userData?.tipo,
        empresa,
      });
      requestNotificationPermission().catch(() => {});

      goToNextScreen(userData, empresa);
    } catch (error) {
      Alert.alert("Erro", error.message || "Erro ao realizar login social");
    } finally {
      setSocialLoading(false);
    }
  }

  async function handleAppleSignIn() {
    setSocialLoading(true);
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      // A Apple só manda o nome no primeiro login desse usuário; nos próximos
      // credential.fullName vem nulo. O backend só usa isso ao criar a conta.
      const nomeCompleto = [credential.fullName?.givenName, credential.fullName?.familyName]
        .filter(Boolean)
        .join(" ")
        .trim();
      await handleSocialLogin("apple", {
        identityToken: credential.identityToken,
        plataforma: Platform.OS,
        ...(nomeCompleto ? { nome: nomeCompleto } : {}),
      });
    } catch (error) {
      setSocialLoading(false);
      if (error.code === "ERR_REQUEST_CANCELED") return;
      Alert.alert("Erro", error.message || "Erro ao realizar login com Apple");
    }
  }

  async function handleSignIn() {
    if (!email.trim() || !senha.trim()) {
      Alert.alert("Atenção", "Preencha o login e a senha corporativos.");
      return;
    }

    try {
      const response = await api.post(
        "/auth/corporativo/login",
        {
          login: email.trim(),
          senha,
          plataforma: Platform.OS,
        },
        { authenticated: false },
      );

      const payload = response?.dados || response?.data || response;
      const userData = payload?.usuario || payload?.user || payload;
      const token = payload?.access_token || payload?.token;
      const refreshToken = payload?.refresh_token;
      const company =
        userData?.empresa?.codigo ||
        userData?.empresa_codigo ||
        userData?.empresa;
      const empresa =
        typeof company === "string" ? company.toLowerCase() : company;

      if (token) {
        await setTokens({ access_token: token, refresh_token: refreshToken });
      }

      signIn({
        ...userData,
        login: userData?.login || email.trim(),
        tipo: userData?.perfil || userData?.tipo,
        empresa,
      });
      requestNotificationPermission().catch(() => {});

      goToNextScreen(userData, empresa);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", error.message || "Erro ao realizar login");
    }
  }

  return (
    <SafeAreaView style={styles.safe} edges={["left", "right", "bottom"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo em círculo */}
          <View style={styles.logoCircle}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Bem-vindo</Text>
          <Text style={styles.subtitle}>
            Entre para continuar aprendendo{"\n"}com a Lingueto
          </Text>

          {/* Google */}
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGooglePress}
            disabled={!googleRequest || socialLoading}
            activeOpacity={0.85}
          >
            <AntDesign name="google" size={20} color="#4285F4" />
            <Text style={styles.googleText}>Continuar com Google</Text>
          </TouchableOpacity>

          {/* Apple (nativo no iOS, fallback no Android) */}
          {Platform.OS === "ios" ? (
            <AppleAuthentication.AppleAuthenticationButton
              buttonType={
                AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
              }
              buttonStyle={
                isDark
                  ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
                  : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
              }
              cornerRadius={15}
              style={styles.appleNativeButton}
              onPress={handleAppleSignIn}
            />
          ) : (
            <TouchableOpacity
              style={styles.appleButton}
              onPress={handleAppleSignIn}
              activeOpacity={0.85}
            >
              <AntDesign name="apple" size={20} color={CORES.LOGIN_APPLE_TEXT} />
              <Text style={styles.appleText}>Continuar com Apple</Text>
            </TouchableOpacity>
          )}

          {/* Divisor corporativo */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>CONTA CORPORATIVA</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Toggle de acesso corporativo */}
          <TouchableOpacity
            style={styles.corpToggle}
            onPress={toggleCorp}
            activeOpacity={0.8}
          >
            <Ionicons name="business-outline" size={18} color={CORES.LOGIN_MINT_DARK} />
            <Text style={styles.corpToggleText}>
              {corpOpen
                ? "Ocultar acesso corporativo"
                : "Sou colaborador de uma empresa"}
            </Text>
            <Ionicons
              name={corpOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color={CORES.LOGIN_MINT_DARK}
            />
          </TouchableOpacity>

          {/* Campos corporativos - só aparecem ao abrir */}
          {corpOpen && (
            <View style={styles.corpFields}>
              <Text style={styles.label}>Login corporativo</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="usuario@empresa.com"
                placeholderTextColor={CORES.TEXT_FAINT}
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Text style={[styles.label, { marginTop: 16 }]}>Senha</Text>
              <View style={styles.senhaWrap}>
                <TextInput
                  value={senha}
                  onChangeText={setSenha}
                  placeholder="••••••••"
                  placeholderTextColor={CORES.TEXT_FAINT}
                  style={[styles.input, { paddingRight: 48 }]}
                  secureTextEntry={!showSenha}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowSenha((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <Ionicons
                    name={showSenha ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color={CORES.TEXT_FAINT}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.entrarButton}
                onPress={handleSignIn}
                activeOpacity={0.85}
              >
                <Text style={styles.entrarText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  Alert.alert("Recuperar senha", "Em breve.")
                }
              >
                <Text style={styles.forgot}>
                  Esqueceu a senha? <Text style={styles.forgotLink}>Recuperar</Text>
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.signUpWrap}
            onPress={() => Alert.alert("Cadastro", "Tela de cadastro em breve")}
          >
            <Text style={styles.noAccount}>
              Não tem uma conta? <Text style={styles.signUpText}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {socialLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={CORES.ON_ACCENT} />
        </View>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: CORES.LOGIN_BG,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: CORES.OVERLAY,
      alignItems: "center",
      justifyContent: "center",
    },
    container: {
      alignItems: "center",
      paddingVertical: 34,
      paddingHorizontal: 26,
      flexGrow: 1,
      justifyContent: "center",
    },
    logoCircle: {
      width: 112,
      height: 112,
      borderRadius: 56,
      backgroundColor: CORES.SURFACE,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      borderWidth: 4,
      borderColor: CORES.SURFACE,
      shadowColor: CORES.SHADOW,
      shadowOpacity: CORES.mode === "dark" ? 0.45 : 0.22,
      shadowRadius: 26,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
    },
    logo: {
      width: 96,
      height: 96,
      transform: [{ translateY: 4 }],
    },
    title: {
      marginTop: 22,
      fontSize: 26,
      fontWeight: "900",
      color: CORES.LOGIN_INK,
      letterSpacing: 0.5,
    },
    subtitle: {
      marginTop: 4,
      marginBottom: 30,
      fontSize: 15,
      fontWeight: "600",
      color: CORES.LOGIN_MUTED,
      textAlign: "center",
      lineHeight: 21,
    },
    googleButton: {
      width: "100%",
      height: 56,
      borderRadius: 15,
      borderWidth: 1.5,
      borderColor: CORES.BORDER_STRONG,
      backgroundColor: CORES.SURFACE,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      shadowColor: CORES.SHADOW,
      shadowOpacity: CORES.mode === "dark" ? 0.35 : 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    googleText: {
      fontSize: 16,
      fontWeight: "800",
      color: CORES.TEXT,
    },
    appleButton: {
      width: "100%",
      height: 56,
      marginTop: 13,
      borderRadius: 15,
      backgroundColor: CORES.LOGIN_APPLE_BG,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 11,
    },
    appleNativeButton: {
      width: "100%",
      height: 56,
      marginTop: 13,
    },
    appleText: {
      fontSize: 16,
      fontWeight: "800",
      color: CORES.LOGIN_APPLE_TEXT,
    },
    dividerRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginTop: 26,
      marginBottom: 6,
      gap: 14,
    },
    dividerLine: {
      flex: 1,
      height: 1.5,
      backgroundColor: CORES.LOGIN_BORDER,
    },
    dividerText: {
      fontSize: 12,
      fontWeight: "800",
      color: CORES.TEXT_FAINT,
      letterSpacing: 1,
    },
    corpToggle: {
      width: "100%",
      height: 48,
      marginTop: 12,
      borderRadius: 15,
      borderWidth: 1.5,
      borderStyle: "dashed",
      borderColor: CORES.SECONDARY,
      backgroundColor: CORES.LOGIN_MINT_SOFT,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    corpToggleText: {
      fontSize: 15,
      fontWeight: "800",
      color: CORES.LOGIN_MINT_DARK,
    },
    corpFields: {
      width: "100%",
      marginTop: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "800",
      color: CORES.TEXT,
      marginBottom: 7,
      marginLeft: 2,
    },
    input: {
      width: "100%",
      height: 54,
      borderRadius: 14,
      borderWidth: 2,
      borderColor: CORES.LOGIN_BORDER,
      backgroundColor: CORES.SURFACE,
      paddingHorizontal: 16,
      fontSize: 16,
      fontWeight: "600",
      color: CORES.LOGIN_INK,
    },
    senhaWrap: {
      position: "relative",
      justifyContent: "center",
    },
    eyeButton: {
      position: "absolute",
      right: 10,
      height: 36,
      width: 36,
      alignItems: "center",
      justifyContent: "center",
    },
    entrarButton: {
      width: "100%",
      height: 54,
      marginTop: 20,
      borderRadius: 14,
      backgroundColor: CORES.SECONDARY,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: CORES.SECONDARY,
      shadowOpacity: 0.4,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    entrarText: {
      fontSize: 17,
      fontWeight: "900",
      color: CORES.ON_ACCENT,
      letterSpacing: 0.5,
    },
    forgot: {
      textAlign: "center",
      marginTop: 14,
      fontSize: 13,
      fontWeight: "700",
      color: CORES.TEXT_FAINT,
    },
    forgotLink: {
      color: CORES.LOGIN_MINT_DARK,
      textDecorationLine: "underline",
    },
    signUpWrap: {
      marginTop: 22,
    },
    noAccount: {
      fontSize: 14,
      fontWeight: "700",
      color: CORES.LOGIN_MUTED,
      textAlign: "center",
    },
    signUpText: {
      color: CORES.LOGIN_MINT_DARK,
      fontWeight: "900",
      textDecorationLine: "underline",
    },
  });
