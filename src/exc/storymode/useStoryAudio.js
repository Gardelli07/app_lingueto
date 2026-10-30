import { useEffect, useRef, useState } from "react";
import { createAudioPlayer } from "expo-audio";
import * as Speech from "expo-speech";

// Toca o `audioSource` gravado da historia; sem audio gravado, cai pro TTS
// lendo o proprio texto (sem seek nem tempo nesse caso, igual ao
// ListenOnlySlide).
export function useStoryAudio(activity, spokenText) {
  const playerRef = useRef(null);
  const playbackSubscriptionRef = useRef(null);
  const shouldResumeAfterSeekRef = useRef(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  // Segundos; 0 enquanto nao se sabe (TTS ou player ainda carregando).
  const [duration, setDuration] = useState(
    (activity.audioDurationMs || 0) / 1000,
  );

  const fallbackDuration = (activity.audioDurationMs || 0) / 1000;

  const clearPlayback = () => {
    if (playbackSubscriptionRef.current) {
      playbackSubscriptionRef.current.remove();
      playbackSubscriptionRef.current = null;
    }

    if (playerRef.current) {
      // No Android o remove() so tira o player do mapa do modulo e o audio
      // segue tocando; o release() (o mesmo que o useAudioPlayer usa) e que
      // solta o player nativo. O pause() antes corta o som na hora.
      playerRef.current.pause();
      playerRef.current.release();
      playerRef.current = null;
    }

    shouldResumeAfterSeekRef.current = false;
    Speech.stop().catch(() => {});
    setIsAudioPlaying(false);
  };

  useEffect(() => {
    return () => {
      clearPlayback();
    };
  }, []);

  const updateAudioStatus = (status) => {
    if (!status?.isLoaded) {
      setIsAudioPlaying(false);
      return;
    }

    const nextDuration =
      typeof status.duration === "number" && status.duration > 0
        ? status.duration
        : fallbackDuration;
    const currentTime =
      typeof status.currentTime === "number" ? status.currentTime : 0;
    const progress = nextDuration > 0 ? currentTime / nextDuration : 0;

    setDuration(nextDuration);
    setAudioProgress(Math.max(0, Math.min(progress, 1)));
    setIsAudioPlaying(Boolean(status.playing));

    if (status.didJustFinish) {
      setAudioProgress(1);
      setIsAudioPlaying(false);
    }
  };

  const ensureAudioPlayer = () => {
    if (playerRef.current || !activity.audioSource) {
      return playerRef.current;
    }

    const player = createAudioPlayer(activity.audioSource, {
      updateInterval: 100,
    });
    playbackSubscriptionRef.current = player.addListener(
      "playbackStatusUpdate",
      updateAudioStatus,
    );
    playerRef.current = player;

    return player;
  };

  const playAudio = async () => {
    if (!activity.audioSource) {
      if (isAudioPlaying) {
        clearPlayback();
        return;
      }

      setAudioProgress(0);
      setIsAudioPlaying(true);
      Speech.speak(spokenText, {
        language: activity.audioLanguage || "en-US",
        rate: activity.audioRate || 0.85,
        onDone: () => {
          setAudioProgress(1);
          setIsAudioPlaying(false);
        },
        onStopped: () => setIsAudioPlaying(false),
        onError: () => setIsAudioPlaying(false),
      });
      return;
    }

    try {
      const player = ensureAudioPlayer();
      if (!player) return;

      if (isAudioPlaying) {
        player.pause();
        setIsAudioPlaying(false);
        return;
      }

      if (audioProgress >= 0.995) {
        await player.seekTo(0);
        setAudioProgress(0);
      }

      player.play();
      setIsAudioPlaying(true);
    } catch (error) {
      console.warn("Exercise21 playAudio error", error);
      clearPlayback();
      setAudioProgress(0);
    }
  };

  const handleAudioSeekStart = () => {
    shouldResumeAfterSeekRef.current = isAudioPlaying;
    playerRef.current?.pause?.();
    setIsAudioPlaying(false);
  };

  const handleAudioSeek = (value) => {
    setAudioProgress(Math.max(0, Math.min(value, 1)));
  };

  const handleAudioSeekComplete = async (value) => {
    const player = ensureAudioPlayer();
    const progress = Math.max(0, Math.min(value, 1));

    setAudioProgress(progress);

    if (!player) return;

    try {
      await player.seekTo((player.duration || fallbackDuration) * progress);

      if (shouldResumeAfterSeekRef.current) {
        player.play();
        setIsAudioPlaying(true);
      }
    } catch (error) {
      console.warn("Exercise21 seekAudio error", error);
    } finally {
      shouldResumeAfterSeekRef.current = false;
    }
  };

  return {
    isAudioPlaying,
    audioProgress,
    duration: activity.audioSource ? duration : 0,
    canSeek: Boolean(activity.audioSource),
    playAudio,
    clearPlayback,
    handleAudioSeekStart,
    handleAudioSeek,
    handleAudioSeekComplete,
  };
}
