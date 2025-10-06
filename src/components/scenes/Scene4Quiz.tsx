import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import solSmiling from "@/assets/sol-smiling.svg";
import lunaScientist from "@/assets/luna-scientist.svg";

interface Scene4Props {
  playerName: string;
  onComplete: (score: number) => void;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questions: Question[] = [
  {
    question: "What is a solar flare?",
    options: [
      "A space explosion from the Sun",
      "A star twinkle",
      "A rocket engine",
      "A shooting star",
    ],
    correctAnswer: 0,
  },
  {
    question: "Who can be affected by space weather?",
    options: ["Astronauts", "Farmers", "Painters", "Fish"],
    correctAnswer: 0,
  },
  {
    question: "What beautiful event does space weather create?",
    options: ["Northern Lights", "Rainbows", "Earthquakes", "Clouds"],
    correctAnswer: 0,
  },
  {
    question: "What does Sol provide to Earth?",
    options: ["Light and warmth", "Rain", "Snow", "Wind"],
    correctAnswer: 0,
  },
  {
    question: "What can space weather cause on Earth?",
    options: [
      "Power blackouts",
      "Tornadoes",
      "Tsunamis",
      "Hurricanes",
    ],
    correctAnswer: 0,
  },
];

const Scene4Quiz = ({ playerName, onComplete }: Scene4Props) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);

    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("That's right! ⭐", {
        description: "Great job!",
      });
    } else {
      toast.error("Try to remember for next time!", {
        description: "Don't worry, you're learning!",
      });
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setTimeout(() => {
          onComplete(score + (isCorrect ? 1 : 0));
        }, 1000);
      }
    }, 2000);
  };

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-700 to-indigo-600 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Characters on sides */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-10 animate-float">
        <img src={solSmiling} alt="Sol" className="w-32 h-32" />
      </div>
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-10 animate-float-slow">
        <img src={lunaScientist} alt="Luna" className="w-40 h-40" />
      </div>

      {/* Quiz content */}
      <div className="relative z-10 w-full max-w-3xl animate-zoom-in">
        <h2 className="text-5xl font-bold text-white text-center mb-4 drop-shadow-lg">
          Space Weather Quiz! 🌟
        </h2>
        <p className="text-2xl text-white/90 text-center mb-8">
          Question {currentQuestion + 1} of {questions.length}
        </p>

        <Card className="p-8 bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl">
          <h3 className="text-3xl font-bold text-card-foreground mb-8 text-center">
            {question.question}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = showFeedback && isSelected;

              return (
                <Button
                  key={index}
                  onClick={() => !showFeedback && handleAnswer(index)}
                  disabled={showFeedback}
                  className={`text-xl py-8 px-6 rounded-2xl font-bold transition-all ${
                    showResult
                      ? isCorrect
                        ? "bg-green-500 hover:bg-green-500 text-white scale-105"
                        : "bg-red-500 hover:bg-red-500 text-white"
                      : "bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105"
                  }`}
                >
                  {option}
                  {showResult && (isCorrect ? " ✓" : " ✗")}
                </Button>
              );
            })}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xl font-bold text-card-foreground">
              Score: {score} / {currentQuestion + (showFeedback ? 1 : 0)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Scene4Quiz;
