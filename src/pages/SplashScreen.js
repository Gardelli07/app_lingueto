import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";
import { useTheme, useThemedStyles } from "../theme";
import { useAuth } from "../context/AuthContext";
import { syncCourseProgressFromServer } from "../util/courseCatalog";
import { syncAulasPlusProgressFromServer } from "./aulas/aulasplus/progress";

const splashVideo = require("../../assets/splash.mp4");

export default function SplashScreen({ navigation }) {
  const styles = useThemedStyles(makeStyles);
  const { user, carregando } = useAuth();
  const player = useVideoPlayer(splashVideo, (p) => {
    p.muted = true;
    p.play();
  });

  useEffect(() => {
    if (carregando) return;

    let cancelled = false;
    // Espera o video de abertura tocar ate o fim antes de navegar, com um
    // teto de tempo como rede de seguranca caso ele falhe ao carregar.
    const videoDone = Promise.race([
      new Promise((resolve) => {
        const subscription = player.addListener("playToEnd", () => {
          subscription.remove();
          resolve();
        });
      }),
      new Promise((resolve) => setTimeout(resolve, 15000)),
    ]);
    // Espera o progresso salvo no backend chegar antes de navegar (com um
    // teto de tempo) para as telas de curso ja abrirem com os dados certos.
    const progressSync = user
      ? Promise.race([
          Promise.all([
            syncCourseProgressFromServer(),
            syncAulasPlusProgressFromServer(),
          ]).catch(() => {}),
          new Promise((resolve) => setTimeout(resolve, 4000)),
        ])
      : Promise.resolve();

    Promise.all([videoDone, progressSync]).then(() => {
      if (cancelled) return;
      if (!user) {
        navigation.replace("Login");
      } else if (!user.teste_nivelamento_concluido) {
        navigation.replace("PlacementFlow");
      } else {
        navigation.replace("Tabs");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [navigation, carregando, user, player]);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
        allowsPictureInPicture={false}
      />
    </View>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CORES.PRIMARY,
    },
    video: {
      flex: 1,
    },
  });
