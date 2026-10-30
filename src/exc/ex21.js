import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StoryReading } from "./storymode/StoryReading";
import { StoryQuestions } from "./storymode/StoryQuestions";

// Story Mode: tela de leitura (com toque para traduzir) e depois as
// perguntas, num slide so. O texto so existe na leitura, entao o aluno
// responde sem consulta.
export function Exercise21(props) {
  const { activity, next, onAttempt } = props;
  const navigation = useNavigation();
  const [showQuestions, setShowQuestions] = useState(false);
  const questionCount = (activity.questions || []).length;

  const handleFinishReading = () => {
    if (questionCount > 0) {
      setShowQuestions(true);
      return;
    }

    // Historia sem perguntas funciona como o Tip (Exercise17): so leitura.
    onAttempt?.({
      isCorrect: true,
      correctDelta: 0,
      totalDelta: 0,
      exerciseAccuracy: 100,
    });
    next();
  };

  if (showQuestions) {
    return <StoryQuestions {...props} />;
  }

  return (
    <StoryReading
      activity={activity}
      // A leitura conta como um passo antes das perguntas.
      progress={1 / (questionCount + 1)}
      onClose={() => navigation.goBack()}
      onFinishReading={handleFinishReading}
    />
  );
}

// Layout proprio (safe area, scroll e paineis fixos no rodape nas duas
// telas): o LessonScreen nao embrulha esse slide.
Exercise21.fullScreen = true;

/*
  Historia + perguntas. O tamanho do texto e o numero de perguntas sao
  livres: aulas mais avancadas so trazem um `text` maior e mais `questions`.

  {
    component: "Exercise21",
    activity: {
      image: ICA1.Hi02,
      imageDescription: "Lucas sentado num banco de praca", // opcional (acessibilidade)
      audioSource: require("../../../../../mp3/IC/A0-A1/Hi01.mp3"), // opcional
      audioDurationMs: 22909, // opcional, so usado ate o player carregar
      title: "Lucas's Family", // opcional
      // Paragrafos (array, ou string com linha em branco entre eles).
      // Palavras ligadas por "_" formam uma expressao.
      text: [
        "Hi! My_name_is Lucas, and I'm_24_years_old.",
      ],
      // Opcional: liga o "toque para traduzir". Chaves em minusculo e sem
      // pontuacao, da expressao inteira e de cada palavra.
      dictionary: { "my name is": "meu nome é", my: "meu / minha" },
      questionsLabel: "Questions", // opcional (texto do botao da 1a tela)
      questionsSubtitle: "Choose the correct answer.", // opcional
      questions: [
        {
          question: "How old is Lucas?",
          options: ["12 years old.", "24 years old.", "30 years old."],
          correctAnswer: "24 years old.",
          hint: "Hi! My name is Lucas, and I'm 24 years old.", // opcional
          explanation: "Lucas says “I’m 24 years old.”", // no acerto
          correction: "Anna is the one who is 12.", // no erro, depois de "It's <resposta> —"
        },
      ],
    },
  },

  Aulas antigas com so `feedbackMessage` na pergunta usam ele no acerto e no
  erro. Sem `audioSource`, o botao de audio le o texto com TTS
  (audioLanguage / audioRate opcionais). Sem `questions`, o botao vira
  "Continuar".
*/
