import createLessonScreen from "../../LessonScreen";
import { ICA1 } from "../../../../util/images";

const LESSON_SLIDES = [
  {
    component: "Exercise21",
    activity: {
      image: ICA1.Hi01,
      audioSource: require("../../../../../mp3/IC/A0-A1/Hi01.mp3"),
      audioDurationMs: 22909,
      title: "Alex's Saturday",
      text: `Hi! My name is Alex. I'm 22 years old. I live in New York.

On Saturdays, I go to the park with my friend, Emma. We walk, talk, and eat ice cream. Emma likes chocolate ice cream, but I prefer vanilla.

After the park, we go to a coffee shop. I drink coffee, and Emma drinks tea. We have a great time together!`,
      questionsLabel: "Questions",
      questionsTitle: "Check your understanding",
      questions: [
        {
          question: "How old is Alex?",
          options: ["20 years old.", "22 years old.", "25 years old."],
          correctAnswer: "22 years old.",
          feedbackMessage: 'Na história, Alex diz: "I\'m 22 years old."',
        },
        {
          question: "Where does Alex go on Saturdays?",
          options: ["To the park.", "To the cinema.", "To the gym."],
          correctAnswer: "To the park.",
          feedbackMessage:
            'Na história: "On Saturdays, I go to the park with my friend, Emma."',
        },
        {
          question: "What kind of ice cream does Emma like?",
          options: ["Vanilla.", "Strawberry.", "Chocolate."],
          correctAnswer: "Chocolate.",
          feedbackMessage:
            'Na história: "Emma likes chocolate ice cream, but I prefer vanilla."',
        },
      ],
    },
  },
  {
    key: "lesson-finish",
    type: "finish",
  },
];

export default createLessonScreen(LESSON_SLIDES, {
  storageKey: "@curso_progress_story_mode_A0-A1",
  nextRouteName: "StoryMode",
  screenName: "StoryModeA0A1LessonScreen",
});
