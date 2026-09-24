import React, { useMemo, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { useTheme, useThemedStyles } from "../theme";

const COURSES = [
  {
    id: "ic",
    title: "Inglês completo",
    subtitle: "Construa uma base forte para qualquer situação",
    icon: "brain",
    emoji: "🧠",
    homeName: "Ingles Completo",
  },
  {
    id: "travel",
    title: "Viagens",
    subtitle: "Fale com confiança em aeroportos, hotéis e passeios",
    icon: "airplane",
    emoji: "✈️",
    homeName: "Ingles para viagem",
  },
  {
    id: "business",
    title: "Negócios",
    subtitle: "Ganhe segurança em reuniões e conversas profissionais",
    icon: "briefcase",
    emoji: "💼",
    homeName: "Bussines English",
  },
];

const LEVELS = [
  {
    id: "beginner",
    title: "Iniciante",
    subtitle: "0-20% - você está começando uma jornada incrível.",
    icon: "sprout",
    homeLevel: "Starter",
  },
  {
    id: "basic",
    title: "Básico",
    subtitle: "20-40% - já sabe o essencial, hora de acelerar.",
    icon: "leaf",
    homeLevel: "Elementary",
  },
  {
    id: "intermediate",
    title: "Intermediário",
    subtitle: "40-70% - você já se comunica bem.",
    icon: "tree",
    homeLevel: "Intermediate",
  },
  {
    id: "advanced",
    title: "Avançado",
    subtitle: "70-100% - quase fluente, vamos polir.",
    icon: "image-filter-hdr",
    homeLevel: "Advanced",
  },
];

const AVAILABLE_LEVELS_BY_COURSE = {
  ic: ["beginner", "basic", "intermediate"],
  travel: ["beginner"],
  business: ["beginner", "intermediate"],
};

const levelOrder = ["beginner", "basic", "intermediate", "advanced"];

const questionBank = {
  ic: {
    beginner: [
      q("What is 'gato' in English?", ["Dog", "Cat", "Bird", "Fish"], "Cat"),
      q(
        "Choose the correct greeting.",
        ["Good morning", "Blue table", "Fast car", "Old phone"],
        "Good morning",
      ),
      q(
        "What does 'I am happy' mean?",
        ["Eu estou feliz", "Eu estou atrasado", "Eu tenho fome", "Eu sou alto"],
        "Eu estou feliz",
      ),
      q("Complete: She ___ my friend.", ["am", "are", "is", "be"], "is"),
      q(
        "Which word is a color?",
        ["Chair", "Green", "Window", "Speak"],
        "Green",
      ),
    ],
    basic: [
      q(
        "Complete: I usually ___ coffee in the morning.",
        ["drink", "drinks", "drinking", "drank"],
        "drink",
      ),
      q(
        "Choose the correct sentence.",
        [
          "He don't like tea.",
          "He doesn't like tea.",
          "He isn't likes tea.",
          "He not like tea.",
        ],
        "He doesn't like tea.",
      ),
      q(
        "What is the opposite of 'expensive'?",
        ["Cheap", "Tall", "Late", "Strong"],
        "Cheap",
      ),
      q(
        "Complete: There ___ two books on the table.",
        ["is", "are", "am", "be"],
        "are",
      ),
      q(
        "Which question is correct?",
        [
          "Where you live?",
          "Where do you live?",
          "Where does you live?",
          "Where are live?",
        ],
        "Where do you live?",
      ),
    ],
    intermediate: [
      q(
        "Complete: If it rains, we ___ at home.",
        ["stay", "stayed", "will stay", "would stayed"],
        "will stay",
      ),
      q(
        "Choose the best option: I have lived here ___ 2021.",
        ["for", "since", "during", "by"],
        "since",
      ),
      q(
        "Which sentence uses present perfect correctly?",
        [
          "She has finished the report.",
          "She have finished the report.",
          "She has finish the report.",
          "She finished has the report.",
        ],
        "She has finished the report.",
      ),
      q(
        "What does 'to figure out' mean?",
        ["Descobrir", "Desistir", "Guardar", "Emprestar"],
        "Descobrir",
      ),
      q(
        "Complete: The movie was ___ than I expected.",
        ["good", "better", "best", "the better"],
        "better",
      ),
    ],
    advanced: [
      q(
        "Choose the most natural sentence.",
        [
          "Had I known, I would have called.",
          "If I knew, I would had called.",
          "Had I knew, I called.",
          "If I had know, I call.",
        ],
        "Had I known, I would have called.",
      ),
      q(
        "What does 'nevertheless' express?",
        ["Contrast", "Cause", "Sequence", "Quantity"],
        "Contrast",
      ),
      q(
        "Complete: She insisted that he ___ on time.",
        ["is", "was", "be", "will be"],
        "be",
      ),
      q(
        "Choose the best rewrite: 'Despite the delay, we arrived.'",
        [
          "Although there was a delay, we arrived.",
          "Because there was a delay, we arrived.",
          "We arrived so there was a delay.",
          "We arrived unless there was a delay.",
        ],
        "Although there was a delay, we arrived.",
      ),
      q(
        "What is a synonym for 'compelling'?",
        ["Persuasive", "Tiny", "Careless", "Ordinary"],
        "Persuasive",
      ),
    ],
  },
  travel: {
    beginner: [
      q(
        "How do you say 'passaporte' in English?",
        ["Ticket", "Passport", "Gate", "Seat"],
        "Passport",
      ),
      q(
        "Complete: Where is the ___?",
        ["bathroom", "happy", "slowly", "drinked"],
        "bathroom",
      ),
      q(
        "What means 'hotel'?",
        ["Hotel", "Aeroporto", "Praia", "Maleta"],
        "Hotel",
      ),
      q(
        "Choose the phrase for asking price.",
        [
          "How much is it?",
          "Where are you from?",
          "I am fine.",
          "See you later.",
        ],
        "How much is it?",
      ),
      q(
        "What is 'bag' in Portuguese?",
        ["Bolsa", "Rua", "Chave", "Janela"],
        "Bolsa",
      ),
    ],
    basic: [
      q(
        "At the airport, you say:",
        [
          "I would like to check in.",
          "I check ate.",
          "I am hotel.",
          "I need a table.",
        ],
        "I would like to check in.",
      ),
      q(
        "Complete: I have a reservation ___ two nights.",
        ["for", "to", "at", "in"],
        "for",
      ),
      q(
        "What does 'boarding pass' mean?",
        [
          "Cartão de embarque",
          "Chave do quarto",
          "Conta do restaurante",
          "Seguro viagem",
        ],
        "Cartão de embarque",
      ),
      q(
        "Choose the correct request.",
        [
          "Can I have the menu, please?",
          "Can I has menu?",
          "I can menu please?",
          "Menu I please have?",
        ],
        "Can I have the menu, please?",
      ),
      q(
        "What means 'departure'?",
        ["Partida", "Chegada", "Assento", "Bagagem"],
        "Partida",
      ),
    ],
    intermediate: [
      q(
        "Complete: My flight has been ___ by two hours.",
        ["delayed", "delay", "delaying", "delays"],
        "delayed",
      ),
      q(
        "What would you say if your luggage is missing?",
        [
          "My luggage did not arrive.",
          "My luggage is delicious.",
          "My luggage speaks.",
          "My luggage is boarding.",
        ],
        "My luggage did not arrive.",
      ),
      q(
        "Choose the natural sentence.",
        [
          "Could you recommend a local restaurant?",
          "Could you recommending a local restaurant?",
          "Could recommend you local restaurant?",
          "You could local restaurant?",
        ],
        "Could you recommend a local restaurant?",
      ),
      q(
        "What does 'round trip' mean?",
        ["Ida e volta", "Somente ida", "Atraso", "Conexão"],
        "Ida e volta",
      ),
      q(
        "Complete: Is breakfast included ___ the price?",
        ["in", "on", "at", "by"],
        "in",
      ),
    ],
    advanced: [
      q(
        "Choose the most polite complaint.",
        [
          "I am afraid there may have been a mistake with my booking.",
          "You made my booking bad.",
          "This booking is wrong, fix it.",
          "Mistake booking now.",
        ],
        "I am afraid there may have been a mistake with my booking.",
      ),
      q(
        "What does 'layover' mean?",
        [
          "Conexão longa entre voos",
          "Reserva cancelada",
          "Taxa de bagagem",
          "Portão de embarque",
        ],
        "Conexão longa entre voos",
      ),
      q(
        "Complete: Had I known the museum was closed, I ___ earlier.",
        ["would have gone", "will go", "go", "would went"],
        "would have gone",
      ),
      q(
        "Choose the best phrase for customs.",
        [
          "I have nothing to declare.",
          "I no things declare.",
          "Declare me nothing.",
          "I am not declaration.",
        ],
        "I have nothing to declare.",
      ),
      q(
        "What does 'off the beaten path' mean?",
        [
          "Fora dos roteiros comuns",
          "Muito caro",
          "Perto do aeroporto",
          "Com atraso",
        ],
        "Fora dos roteiros comuns",
      ),
    ],
  },
  business: {
    beginner: [
      q(
        "What is 'reunião' in English?",
        ["Meeting", "Market", "Meal", "Month"],
        "Meeting",
      ),
      q(
        "Choose the correct greeting in a work email.",
        ["Dear Ana,", "Hey chair,", "Blue Ana,", "Goodbye Ana,"],
        "Dear Ana,",
      ),
      q(
        "What does 'job' mean?",
        ["Trabalho", "Janela", "Viagem", "Comida"],
        "Trabalho",
      ),
      q("Complete: I work ___ a company.", ["for", "on", "at", "by"], "for"),
      q(
        "What is 'cliente' in English?",
        ["Client", "Clock", "Cloud", "Class"],
        "Client",
      ),
    ],
    basic: [
      q(
        "Complete: Could you ___ me the report?",
        ["send", "sends", "sending", "sent"],
        "send",
      ),
      q(
        "Choose the correct sentence.",
        [
          "The meeting starts at 9.",
          "The meeting start at 9.",
          "The meeting starting at 9.",
          "The meeting are at 9.",
        ],
        "The meeting starts at 9.",
      ),
      q(
        "What does 'deadline' mean?",
        ["Prazo final", "Salário", "Escritório", "Contrato"],
        "Prazo final",
      ),
      q(
        "How do you ask for clarification?",
        [
          "Could you clarify that?",
          "You clarify now?",
          "Clarify me that?",
          "What clarify?",
        ],
        "Could you clarify that?",
      ),
      q(
        "Complete: I am responsible ___ sales.",
        ["for", "to", "with", "by"],
        "for",
      ),
    ],
    intermediate: [
      q(
        "Choose the best phrase for suggesting a meeting.",
        [
          "Would Tuesday work for you?",
          "Tuesday work you?",
          "Can Tuesday works?",
          "Tuesday is working you?",
        ],
        "Would Tuesday work for you?",
      ),
      q(
        "What does 'to follow up' mean?",
        ["Dar continuidade", "Cancelar", "Contratar", "Atrasar"],
        "Dar continuidade",
      ),
      q(
        "Complete: We need to ___ the budget before Friday.",
        ["review", "reviewing", "reviewed", "reviews"],
        "review",
      ),
      q(
        "Choose the natural sentence.",
        [
          "The proposal was approved by the client.",
          "The proposal approved by client.",
          "The proposal was approve.",
          "The client was approved the proposal.",
        ],
        "The proposal was approved by the client.",
      ),
      q(
        "What is a 'stakeholder'?",
        [
          "Parte interessada",
          "Funcionário temporário",
          "Produto novo",
          "Pagamento",
        ],
        "Parte interessada",
      ),
    ],
    advanced: [
      q(
        "Choose the most professional sentence.",
        [
          "I would appreciate it if you could send the figures by noon.",
          "Send figures noon.",
          "I want you send the numbers.",
          "You must send me figures now.",
        ],
        "I would appreciate it if you could send the figures by noon.",
      ),
      q(
        "What does 'leverage' mean in business?",
        ["Usar estrategicamente", "Esquecer", "Diminuir qualidade", "Atrasar"],
        "Usar estrategicamente",
      ),
      q(
        "Complete: The team managed to meet the deadline ___ limited resources.",
        ["despite", "because", "although", "unless"],
        "despite",
      ),
      q(
        "Choose the best phrase for disagreement.",
        [
          "I see your point, but I have a different perspective.",
          "You are wrong.",
          "No, bad idea.",
          "I disagree because no.",
        ],
        "I see your point, but I have a different perspective.",
      ),
      q(
        "What does 'bottom line' often refer to?",
        ["Resultado final", "Primeira etapa", "Linha do rodapé", "Assinatura"],
        "Resultado final",
      ),
    ],
  },
};

function q(prompt, options, answer) {
  return { prompt, options, answer };
}

function getPreviousAvailableLevel(courseId, levelId) {
  const availableIds = AVAILABLE_LEVELS_BY_COURSE[courseId] || levelOrder;
  const index = levelOrder.indexOf(levelId);
  const previousId = [...levelOrder]
    .slice(0, index)
    .reverse()
    .find((item) => availableIds.includes(item));

  return previousId ? LEVELS.find((item) => item.id === previousId) : null;
}

export default function PlacementFlow({ navigation }) {
  const CORES = useTheme();
  const styles = useThemedStyles(makeStyles);
  const { updateUser } = useAuth();
  const [step, setStep] = useState("intro");
  const [course, setCourse] = useState(null);
  const [level, setLevel] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerLocked, setIsAnswerLocked] = useState(false);
  const feedbackScale = useRef(new Animated.Value(1)).current;

  const questions = useMemo(() => {
    if (!course || !level) return [];
    return questionBank[course.id][level.id];
  }, [course, level]);

  const availableLevels = useMemo(() => {
    if (!course) return LEVELS;
    const availableIds = AVAILABLE_LEVELS_BY_COURSE[course.id] || [];
    return LEVELS.filter((item) => availableIds.includes(item.id));
  }, [course]);

  const score = answers.filter(Boolean).length;
  const progress = questions.length
    ? (questionIndex / questions.length) * 100
    : 0;
  const currentQuestion = questions[questionIndex];
  const selectedIsCorrect =
    selectedAnswer && currentQuestion
      ? selectedAnswer === currentQuestion.answer
      : false;

  const startQuiz = (selectedLevel) => {
    setLevel(selectedLevel);
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
    setStep("quiz");
  };

  const answerQuestion = (option) => {
    if (isAnswerLocked) return;

    setSelectedAnswer(option);
    setIsAnswerLocked(true);

    feedbackScale.setValue(0.98);
    Animated.sequence([
      Animated.spring(feedbackScale, {
        toValue: 1.03,
        friction: 4,
        tension: 130,
        useNativeDriver: true,
      }),
      Animated.spring(feedbackScale, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const goToNextQuestion = () => {
    if (!selectedAnswer || !currentQuestion) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    const nextAnswers = [...answers, isCorrect];

    setAnswers(nextAnswers);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);

    if (questionIndex + 1 >= questions.length) {
      setStep("result");
      return;
    }

    setQuestionIndex((prev) => prev + 1);
  };

  const result = useMemo(() => {
    if (!level) return null;
    const previous = getPreviousAvailableLevel(course.id, level.id);
    const isBeginner = level.id === "beginner";

    if (score >= 4) {
      return {
        title: "Muito bem!",
        message: `Você acertou ${score}/5. Esse nível combina com você, pode continuar em ${level.title}.`,
        recommendedLevel: level,
        tone: "success",
      };
    }

    if (isBeginner) {
      return {
        title: "Ótimo começo!",
        message: `Você acertou ${score}/5. O nível Iniciante é o lugar certo para criar base sem pressa.`,
        recommendedLevel: level,
        tone: "success",
      };
    }

    if (score === 3) {
      return {
        title: "Quase lá.",
        message: `Você acertou 3/5. Minha sugestão sincera: comece por ${previous.title} para ganhar confiança e subir rápido.`,
        recommendedLevel: previous,
        tone: "friendly",
      };
    }

    return {
      title: "Vamos fortalecer sua base.",
      message: `Você acertou ${score}/5. Para evitar frustração, comece por ${previous.title} e avance com mais segurança.`,
      recommendedLevel: previous,
      tone: "honest",
    };
  }, [course, level, score]);

  const goToRecommendedCourse = async () => {
    const targetLevel =
      result && result.recommendedLevel ? result.recommendedLevel : level;

    try {
      await api.post("/nivelamento/concluir", {
        curso_escolhido_codigo: course.id,
        nivel_escolhido_codigo: level.id,
        curso_recomendado_codigo: course.id,
        nivel_recomendado_codigo: targetLevel?.id,
        pontuacao: score,
        total_perguntas: questions.length,
      });
      updateUser({ teste_nivelamento_concluido: true });
    } catch (error) {
      console.error(error);
    }

    navigation.replace("Tabs", {
      screen: "Home",
      params: {
        initialLevel:
          targetLevel && targetLevel.homeLevel
            ? targetLevel.homeLevel
            : "Starter",
      },
    });
  };

  const restart = () => {
    setStep("intro");
    setCourse(null);
    setLevel(null);
    setQuestionIndex(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setIsAnswerLocked(false);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle={CORES.statusBarStyle} backgroundColor={CORES.BACKGROUND} />
      {step === "intro" && (
        <View style={styles.centerScreen}>
          <Text style={styles.heroTitle}>
            Aprender inglês nunca foi tão viciante.
          </Text>
          <Text style={styles.heroSubtitle}>
            Apenas 10 minutos por dia podem mudar sua vida.
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => setStep("course")}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Começar agora</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === "course" && (
        <ScrollView
          contentContainerStyle={styles.choiceContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.screenTitle}>O que você quer estudar?</Text>
          <Text style={styles.screenSubtitle}>
            Isso nos ajuda a personalizar sua experiência
          </Text>

          <View style={styles.optionList}>
            {COURSES.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionCard}
                onPress={() => {
                  setCourse(item);
                  setStep("level");
                }}
                activeOpacity={0.88}
              >
                <Text style={styles.optionEmoji}>{item.emoji}</Text>
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={CORES.PLACEMENT_TRACK}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {step === "level" && (
        <ScrollView
          contentContainerStyle={styles.choiceContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.levelHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                setCourse(null);
                setStep("course");
              }}
              activeOpacity={0.85}
            >
              <MaterialCommunityIcons
                name="arrow-left"
                size={21}
                color={CORES.PLACEMENT_BLUE}
              />
            </TouchableOpacity>

            <View style={styles.selectedCourseChip}>
              <Text style={styles.selectedCourseEmoji}>{course.emoji}</Text>
              <Text style={styles.selectedCourseText}>{course.title}</Text>
            </View>
          </View>

          <Text style={styles.screenTitle}>Qual é o seu nível?</Text>
          <Text style={styles.screenSubtitle}>
            Não se preocupe, vamos ajustar para você
          </Text>

          <View style={styles.optionList}>
            {availableLevels.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.optionCard}
                onPress={() => startQuiz(item)}
                activeOpacity={0.88}
              >
                <MaterialCommunityIcons
                  name={item.icon}
                  size={30}
                  color={item.id === "advanced" ? CORES.PLACEMENT_MUTED : CORES.PRIMARY}
                />
                <View style={styles.optionTextWrap}>
                  <Text style={styles.optionTitle}>{item.title}</Text>
                  <Text style={styles.optionSubtitle}>{item.subtitle}</Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={CORES.PLACEMENT_TRACK}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

      {step === "quiz" && currentQuestion && (
        <View style={styles.quizScreen}>
          <View style={styles.quizTop}>
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${Math.max(progress, 8)}%` },
                ]}
              />
            </View>
            <Text style={styles.questionCounter}>
              {questionIndex + 1}/{questions.length}
            </Text>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionTitle}>{currentQuestion.prompt}</Text>
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrectAnswer = currentQuestion.answer === option;
              const showCorrect = isAnswerLocked && isCorrectAnswer;
              const showWrong =
                isAnswerLocked && isSelected && !isCorrectAnswer;

              return (
                <Animated.View
                  key={option}
                  style={
                    isSelected
                      ? { transform: [{ scale: feedbackScale }] }
                      : null
                  }
                >
                  <TouchableOpacity
                    style={[
                      styles.answerButton,
                      showCorrect && styles.answerButtonCorrect,
                      showWrong && styles.answerButtonWrong,
                      isAnswerLocked &&
                        !showCorrect &&
                        !showWrong &&
                        styles.answerButtonMuted,
                    ]}
                    onPress={() => answerQuestion(option)}
                    activeOpacity={0.85}
                    disabled={isAnswerLocked}
                  >
                    <Text
                      style={[
                        styles.answerText,
                        (showCorrect || showWrong) && styles.answerTextFeedback,
                      ]}
                    >
                      {option}
                    </Text>
                    {(showCorrect || showWrong) && (
                      <MaterialCommunityIcons
                        name={showCorrect ? "check-circle" : "close-circle"}
                        size={22}
                        color={CORES.ON_ACCENT}
                      />
                    )}
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
            {selectedAnswer && (
              <View style={styles.feedbackWrap}>
                <View
                  style={[
                    styles.feedbackPill,
                    selectedIsCorrect
                      ? styles.feedbackPillCorrect
                      : styles.feedbackPillWrong,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={selectedIsCorrect ? "check" : "lightbulb-on-outline"}
                    size={16}
                    color={selectedIsCorrect ? CORES.SUCCESS_TEXT : CORES.DANGER_TEXT}
                  />
                  <Text
                    style={[
                      styles.feedbackText,
                      selectedIsCorrect
                        ? styles.feedbackTextCorrect
                        : styles.feedbackTextWrong,
                    ]}
                  >
                    {selectedIsCorrect
                      ? "Certo! Muito bem."
                      : `Quase. A resposta certa é: ${currentQuestion.answer}`}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.nextQuestionButton}
                  onPress={goToNextQuestion}
                  activeOpacity={0.9}
                >
                  <Text style={styles.nextQuestionButtonText}>
                    {questionIndex + 1 >= questions.length
                      ? "Ver resultado"
                      : "Continuar"}
                  </Text>
                  <MaterialCommunityIcons
                    name="arrow-right"
                    size={18}
                    color={CORES.ON_ACCENT}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {step === "result" && result && (
        <View style={styles.centerScreen}>
          <View
            style={[
              styles.resultIcon,
              result.tone === "honest" && styles.resultIconHonest,
            ]}
          >
            <MaterialCommunityIcons
              name={
                result.tone === "success"
                  ? "trophy"
                  : result.tone === "friendly"
                    ? "compass"
                    : "shield-check"
              }
              size={42}
              color={CORES.ON_ACCENT}
            />
          </View>
          <Text style={styles.heroTitle}>{result.title}</Text>
          <Text style={styles.resultMessage}>{result.message}</Text>
          <Text style={styles.resultMeta}>
            Curso: {course.title} | Recomendação:{" "}
            {result.recommendedLevel.title}
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={goToRecommendedCourse}
            activeOpacity={0.9}
          >
            <Text style={styles.primaryButtonText}>Começar meu curso</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={restart}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Refazer teste</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const makeStyles = (CORES) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: CORES.BACKGROUND,
    },
    centerScreen: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 34,
      paddingBottom: 44,
    },
    avatarStack: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    avatarCircle: {
      width: 48,
      height: 48,
      borderRadius: 24,
      borderWidth: 2,
      borderColor: CORES.SURFACE,
      backgroundColor: CORES.SURFACE,
      overflow: "hidden",
      shadowColor: CORES.SHADOW,
      shadowOpacity: CORES.mode === "dark" ? 0.4 : 0.12,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 4,
    },
    avatarImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    heroTitle: {
      color: CORES.PLACEMENT_BLUE,
      fontSize: 28,
      lineHeight: 34,
      fontWeight: "900",
      textAlign: "center",
    },
    heroSubtitle: {
      marginTop: 18,
      color: CORES.PLACEMENT_TEXT,
      fontSize: 14,
      fontWeight: "600",
      textAlign: "center",
    },
    primaryButton: {
      marginTop: 30,
      minWidth: 150,
      minHeight: 50,
      borderRadius: 13,
      paddingHorizontal: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: CORES.PRIMARY,
      shadowColor: CORES.PRIMARY,
      shadowOpacity: 0.22,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    primaryButtonText: {
      color: CORES.ON_ACCENT,
      fontSize: 14,
      fontWeight: "900",
    },
    secondaryButton: {
      marginTop: 14,
      paddingHorizontal: 18,
      paddingVertical: 10,
    },
    secondaryButtonText: {
      color: CORES.PLACEMENT_TEXT,
      fontSize: 13,
      fontWeight: "800",
    },
    footerHint: {
      marginTop: 24,
      color: CORES.PLACEMENT_HINT,
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
    choiceContent: {
      paddingHorizontal: 28,
      paddingTop: 48,
      paddingBottom: 34,
    },
    levelHeader: {
      minHeight: 42,
      marginBottom: 18,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
    },
    backButton: {
      width: 42,
      height: 42,
      borderRadius: 13,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.PLACEMENT_BORDER,
      alignItems: "center",
      justifyContent: "center",
    },
    selectedCourseChip: {
      minHeight: 42,
      maxWidth: "78%",
      borderRadius: 13,
      backgroundColor: CORES.EX_BLUE_BG,
      borderWidth: 1,
      borderColor: CORES.EX_BORDER,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 1,
    },
    selectedCourseEmoji: {
      fontSize: 18,
      marginRight: 7,
    },
    selectedCourseText: {
      color: CORES.PLACEMENT_BLUE,
      fontSize: 13,
      fontWeight: "900",
      flexShrink: 1,
    },
    screenTitle: {
      color: CORES.PLACEMENT_BLUE,
      fontSize: 23,
      lineHeight: 29,
      fontWeight: "900",
      textAlign: "center",
    },
    screenSubtitle: {
      marginTop: 8,
      color: CORES.PLACEMENT_MUTED,
      fontSize: 13,
      fontWeight: "700",
      textAlign: "center",
    },
    optionList: {
      marginTop: 26,
      gap: 13,
    },
    optionCard: {
      minHeight: 68,
      borderRadius: 15,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.PLACEMENT_BORDER,
      paddingHorizontal: 18,
      paddingVertical: 14,
      flexDirection: "row",
      alignItems: "center",
    },
    optionEmoji: {
      width: 34,
      fontSize: 26,
      textAlign: "center",
    },
    optionTextWrap: {
      flex: 1,
      marginLeft: 14,
    },
    optionTitle: {
      color: CORES.PLACEMENT_BLUE,
      fontSize: 15,
      fontWeight: "900",
    },
    optionSubtitle: {
      marginTop: 3,
      color: CORES.TEXT_FAINT,
      fontSize: 12,
      lineHeight: 16,
      fontWeight: "700",
    },
    quizScreen: {
      flex: 1,
      paddingHorizontal: 26,
      paddingTop: 34,
    },
    quizTop: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
    },
    progressTrack: {
      flex: 1,
      height: 9,
      borderRadius: 999,
      backgroundColor: CORES.PLACEMENT_TRACK,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 999,
      backgroundColor: CORES.PRIMARY,
    },
    xpText: {
      color: CORES.PRIMARY,
      fontSize: 13,
      fontWeight: "900",
    },
    questionCounter: {
      minWidth: 34,
      color: CORES.PRIMARY,
      fontSize: 13,
      fontWeight: "900",
      textAlign: "right",
    },
    questionCard: {
      marginTop: 18,
      borderRadius: 16,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.PLACEMENT_BORDER,
      paddingHorizontal: 20,
      paddingTop: 24,
      paddingBottom: 20,
    },
    questionTitle: {
      color: CORES.PLACEMENT_BLUE,
      fontSize: 21,
      lineHeight: 27,
      fontWeight: "900",
      textAlign: "center",
      marginBottom: 20,
    },
    answerButton: {
      minHeight: 55,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 12,
      backgroundColor: CORES.SURFACE,
      borderWidth: 1,
      borderColor: CORES.PLACEMENT_BORDER,
      paddingHorizontal: 14,
      marginTop: 8,
    },
    answerButtonCorrect: {
      backgroundColor: CORES.PLACEMENT_ACCENT,
      borderColor: CORES.PLACEMENT_ACCENT,
      shadowColor: CORES.PLACEMENT_ACCENT,
      shadowOpacity: 0.22,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    answerButtonWrong: {
      backgroundColor: CORES.PLACEMENT_DANGER,
      borderColor: CORES.PLACEMENT_DANGER,
      shadowColor: CORES.PLACEMENT_DANGER,
      shadowOpacity: 0.2,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    answerButtonMuted: {
      opacity: 0.52,
    },
    answerText: {
      color: CORES.TEXT,
      fontSize: 15,
      fontWeight: "800",
      flex: 1,
      paddingRight: 10,
    },
    answerTextFeedback: {
      color: CORES.ON_ACCENT,
    },
    feedbackWrap: {
      marginTop: 16,
    },
    feedbackPill: {
      borderRadius: 13,
      paddingHorizontal: 12,
      paddingVertical: 10,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    feedbackPillCorrect: {
      backgroundColor: CORES.SUCCESS_BG,
    },
    feedbackPillWrong: {
      backgroundColor: CORES.DANGER_BG,
    },
    feedbackText: {
      flex: 1,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "800",
    },
    feedbackTextCorrect: {
      color: CORES.SUCCESS_TEXT,
    },
    feedbackTextWrong: {
      color: CORES.DANGER_TEXT,
    },
    nextQuestionButton: {
      marginTop: 14,
      minHeight: 48,
      borderRadius: 13,
      backgroundColor: CORES.PRIMARY,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      shadowColor: CORES.PRIMARY,
      shadowOpacity: 0.22,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 4,
    },
    nextQuestionButtonText: {
      color: CORES.ON_ACCENT,
      fontSize: 14,
      fontWeight: "900",
    },
    resultIcon: {
      width: 84,
      height: 84,
      borderRadius: 24,
      backgroundColor: CORES.PLACEMENT_ACCENT,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    resultIconHonest: {
      backgroundColor: CORES.PLACEMENT_DANGER,
    },
    resultMessage: {
      marginTop: 16,
      color: CORES.PLACEMENT_TEXT,
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "700",
      textAlign: "center",
    },
    resultMeta: {
      marginTop: 18,
      color: CORES.PLACEMENT_BLUE,
      fontSize: 13,
      fontWeight: "900",
      textAlign: "center",
    },
  });
