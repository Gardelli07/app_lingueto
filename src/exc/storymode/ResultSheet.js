import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import { C, F } from "./theme";
import { ArrowIcon, BoltIcon, BookIcon, CheckIcon, RetryIcon, Ring, XIcon } from "./icons";
import BottomSheet from "./BottomSheet";
import Mascot from "./Mascot";

// Pop-up de certo ou errado com o sticker do mascote, usado pelo Story Mode,
// pelo Listening e pelo Business.

// O que o anel mostra: a meta do dia que andou ou, sem nenhuma, o progresso da
// aula. `advancedGoal` e undefined enquanto as metas carregam.
export function goalDisplay(advancedGoal, done, total) {
  if (advancedGoal === undefined) return null;
  if (advancedGoal) {
    return {
      label: advancedGoal.completed ? "Goal done!" : "Daily goal",
      current: advancedGoal.progress,
      target: advancedGoal.target,
      description: `Meta diária: ${advancedGoal.label}, ${advancedGoal.progress} de ${advancedGoal.target}`,
    };
  }
  return {
    label: "Lesson",
    current: done,
    target: total,
    description: `Progresso da lição: ${done} de ${total}`,
  };
}

export function WinSheet({ title, text, gain, right, total, goal, onContinue }) {
  return (
    <BottomSheet
      handleColor={C.greenHandle}
      borderColor="#2E3857"
      overlay={<Mascot mood="happy" width={68} style={resultStyles.mascotWin} />}
    >
      <View style={resultStyles.resultRow}>
        <Confetti />
        <PopTile color={C.green}>
          <CheckIcon size={30} width={3} />
        </PopTile>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={[resultStyles.resultTitle, { color: C.greenText }]}>{title}</Text>
          {!!text && <Text style={resultStyles.resultText}>{text}</Text>}
        </View>
      </View>
      {(gain > 0 || goal) && (
        <View
          style={[resultStyles.infoCard, { backgroundColor: C.greenBg, borderColor: C.greenBorder }]}
        >
          <View style={[resultStyles.infoIcon, { borderColor: C.greenBorder }]}>
            <BoltIcon size={20} color={C.greenText} />
          </View>
          <View style={{ flex: 1, gap: 2 }}>
            <Text style={resultStyles.gainBig}>
              {gain > 0 ? `+${gain} XP` : `${right} certas`}
            </Text>
            <Text style={resultStyles.infoSub} numberOfLines={1}>
              {right} de {total} certas
            </Text>
          </View>
          {goal ? (
            <>
              <View
                style={{ alignItems: "flex-end", gap: 2 }}
                accessible
                accessibilityLabel={goal.description}
              >
                <Text style={resultStyles.goalLbl}>{goal.label}</Text>
                <Text style={resultStyles.goalNum}>
                  {Math.min(goal.current, goal.target)}{" "}
                  <Text style={resultStyles.goalOf}>/ {goal.target}</Text>
                </Text>
              </View>
              <Ring progress={goal.current / goal.target} />
            </>
          ) : null}
        </View>
      )}
      <BigButton label="Continue" color={C.greenDark} onPress={onContinue} />
    </BottomSheet>
  );
}

// `children` e o cartao abaixo do texto (segunda chance, dica ou Meus erros).
export function LoseSheet({ text, continueDisabled, onContinue, children }) {
  return (
    <BottomSheet
      handleColor={C.redBorder}
      borderColor="#3A2A3A"
      overlay={<Mascot mood="wrong" width={70} style={resultStyles.mascotLose} />}
    >
      <View style={resultStyles.resultRow}>
        <PopTile color={C.red} shake>
          <XIcon size={28} width={3.2} />
        </PopTile>
        <View style={{ flex: 1, gap: 6 }}>
          <Text style={[resultStyles.resultTitle, { color: C.redText }]}>Not quite</Text>
          <Text style={resultStyles.resultText}>{text}</Text>
        </View>
      </View>
      {children}
      <BigButton
        label="Continue"
        color={C.redDark}
        disabled={continueDisabled}
        onPress={onContinue}
      />
    </BottomSheet>
  );
}

export function LoseInfoCard({ title, body }) {
  return (
    <View style={[resultStyles.infoCard, { backgroundColor: C.redCard, borderColor: C.redBorder }]}>
      <View style={[resultStyles.infoIcon, { borderColor: C.redBorder }]}>
        <BookIcon />
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={resultStyles.infoTitle}>{title}</Text>
        <Text style={resultStyles.infoSub}>{body}</Text>
      </View>
    </View>
  );
}

const chanceCopy = {
  title: "Segunda chance no final",
  body: (cost) => `Use ${cost} XP para tentar de novo no final da lição.`,
  addedTitle: "Segunda chance garantida",
  addedBody: "A pergunta vai voltar no final da lição.",
  noXp: "Você não tem XP suficiente.",
  buying: "Usando seu XP...",
  failed: "Não deu certo agora. Toque para tentar de novo.",
};

// Cartao "Segunda chance no final" do pop-up de erro (Story Mode e Business).
// `secondChance` e o do LessonScreen ({ cost, balance, buy }); `status` e
// idle | buying | added | failed, controlado pela tela que compra.
export function SecondChanceCard({ secondChance, status, onPress }) {
  const added = status === "added";
  const noXp = secondChance.balance < secondChance.cost;
  const disabled = added || status === "buying" || noXp;
  const body = added
    ? chanceCopy.addedBody
    : status === "buying"
      ? chanceCopy.buying
      : noXp
        ? chanceCopy.noXp
        : status === "failed"
          ? chanceCopy.failed
          : chanceCopy.body(secondChance.cost);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled, selected: added, busy: status === "buying" }}
      style={({ pressed }) => [
        resultStyles.infoCard,
        { backgroundColor: C.redCard, borderColor: C.redBorder },
        !added && noXp && { opacity: 0.5 },
        pressed && { opacity: 0.8 },
      ]}
    >
      <View style={[resultStyles.infoIcon, { borderColor: C.redBorder }]}>
        {added ? <CheckIcon size={18} color={C.redText} /> : <RetryIcon />}
      </View>
      <View style={{ flex: 1, gap: 3 }}>
        <Text style={resultStyles.infoTitle}>
          {added ? chanceCopy.addedTitle : chanceCopy.title}
        </Text>
        <Text style={resultStyles.infoSub}>{body}</Text>
      </View>
      {added ? null : (
        <View style={resultStyles.redPill}>
          <BoltIcon size={12} color={C.redText} />
          <Text style={resultStyles.redPillText}>{secondChance.cost} XP</Text>
        </View>
      )}
    </Pressable>
  );
}

function PopTile({ color, children, shake }) {
  const scale = useRef(new Animated.Value(0.4)).current;
  const x = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }).start();
    if (shake) {
      Animated.sequence(
        [6, -6, 4, -4, 0].map((toValue) =>
          Animated.timing(x, { toValue, duration: 70, useNativeDriver: true }),
        ),
      ).start();
    }
  }, [scale, x, shake]);
  return (
    <View style={[resultStyles.tileRing, { borderColor: color + "33" }]}>
      <Animated.View
        style={[
          resultStyles.tile,
          { backgroundColor: color, transform: [{ scale }, { translateX: x }] },
        ]}
      >
        {children}
      </Animated.View>
    </View>
  );
}

const CONFETTI = [
  { l: -14, t: -2, w: 7, h: 14, c: C.accent, r: "-28deg" },
  { l: 20, t: -30, w: 5, h: 5, c: C.green, round: true },
  { l: 26, t: -16, w: 5, h: 12, c: C.green, r: "18deg" },
  { l: 48, t: -14, w: 8, h: 8, c: C.orange, round: true },
  { l: -18, t: 60, w: 5, h: 12, c: C.green, r: "60deg" },
  { l: -8, t: 88, w: 9, h: 13, c: C.orange, r: "-40deg" },
  { l: 80, t: 2, w: 5, h: 12, c: C.accentLight, r: "22deg" },
  { l: 80, t: 26, w: 6, h: 6, c: C.accent, round: true },
  { l: 78, t: 70, w: 5, h: 12, c: C.accentLight, r: "-18deg" },
];

function Confetti() {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(anim, { toValue: 1, duration: 600, delay: 150, useNativeDriver: true }).start();
  }, [anim]);
  return (
    <>
      {CONFETTI.map((piece, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={{
            position: "absolute",
            left: piece.l,
            top: piece.t,
            width: piece.w,
            height: piece.h,
            backgroundColor: piece.c,
            borderRadius: piece.round ? piece.w / 2 : 3,
            opacity: anim,
            transform: [
              { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.2, 1] }) },
              { rotate: piece.r || "0deg" },
            ],
          }}
        />
      ))}
    </>
  );
}

// O Continue fica bloqueado enquanto a compra da segunda chance esta no ar:
// seguir em frente gastaria o XP sem a pergunta voltar.
function BigButton({ label, color, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      style={({ pressed }) => [
        resultStyles.bigBtn,
        { backgroundColor: color, shadowColor: color },
        disabled && { opacity: 0.5 },
        pressed && { opacity: 0.88 },
      ]}
    >
      <Text style={resultStyles.bigBtnText}>{label}</Text>
      <ArrowIcon />
    </Pressable>
  );
}

export const resultStyles = StyleSheet.create({
  mascotWin: { position: "absolute", right: 42, top: -42, zIndex: 2 },
  mascotLose: { position: "absolute", right: 42, top: -60, zIndex: 2 },
  resultRow: { flexDirection: "row", alignItems: "center", gap: 18 },
  tileRing: { borderRadius: 30, borderWidth: 8 },
  tile: { width: 70, height: 70, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  resultTitle: { fontFamily: F.l700, fontSize: 30, lineHeight: 34, letterSpacing: -0.4 },
  resultText: { fontFamily: F.l400, fontSize: 17, lineHeight: 25, color: C.soft },
  answerHi: { fontFamily: F.l600, color: C.greenText },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  infoIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: C.bg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle: { fontFamily: F.l600, fontSize: 17, color: C.white },
  infoSub: { fontFamily: F.l400, fontSize: 13, lineHeight: 19, color: C.soft },
  gainBig: { fontFamily: F.l700, fontSize: 28, lineHeight: 32, color: C.greenText },
  goalLbl: { fontFamily: F.l500, fontSize: 13, color: C.soft },
  goalNum: { fontFamily: F.l700, fontSize: 18, color: C.white },
  goalOf: { fontFamily: F.l400, color: C.soft },
  bigBtn: {
    height: 62,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  bigBtnText: { fontFamily: F.l600, fontSize: 21, color: C.white },
  redPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.redBorder,
  },
  redPillText: { fontFamily: F.l600, fontSize: 15, color: C.redText },
});
