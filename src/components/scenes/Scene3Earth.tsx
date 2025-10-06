import { useState } from "react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/TypewriterText";
import solSmiling from "@/assets/sol-smiling.svg";
import lunaScientist from "@/assets/luna-scientist.svg";

interface Scene3Props {
  playerName: string;
  onNext: () => void;
}

const Scene3Earth = ({ playerName, onNext }: Scene3Props) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogues = [
    {
      speaker: "Luna",
      text: `Hello, ${playerName}! I study how the Sun affects people on Earth.`,
    },
    {
      speaker: "Sol",
      text: "When I get stormy, I can make beautiful northern lights but also cause power blackouts!",
    },
    {
      speaker: "Luna",
      text: "That's why learning space weather helps us protect astronauts and satellites.",
    },
  ];

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onNext();
    }
  };

  const currentDialogue = dialogues[dialogueIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500 flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Earth glow effect */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[800px] h-[400px] bg-blue-400 rounded-full blur-3xl opacity-30" />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 50}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Characters */}
      <div className="relative z-10 flex items-end justify-around w-full max-w-5xl mb-8 animate-fade-in">
        <div className="text-center">
          <img 
            src={solSmiling} 
            alt="Sol" 
            className="w-56 h-56 animate-float"
          />
          <p className="text-primary font-bold text-xl mt-2 drop-shadow-lg">Sol</p>
        </div>
        <div className="text-center">
          <img 
            src={lunaScientist} 
            alt="Luna the Scientist" 
            className="w-64 h-64 animate-float-slow"
          />
          <p className="text-white font-bold text-xl mt-2 drop-shadow-lg">Luna</p>
        </div>
      </div>

      {/* Dialogue box */}
      <div className="relative z-10 bg-card/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-3xl w-full animate-slide-up">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-2xl">
              {currentDialogue.speaker === "Sol" ? "☀️" : "👩‍🔬"}
            </span>
          </div>
          <p className="text-lg font-bold text-card-foreground">
            {currentDialogue.speaker}
          </p>
        </div>
        <TypewriterText
          text={currentDialogue.text}
          className="text-2xl font-medium text-card-foreground min-h-[100px] flex items-center"
        />

        <div className="mt-8 text-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="text-2xl py-6 px-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            {dialogueIndex < dialogues.length - 1 ? "Continue" : "Take the Quiz!"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scene3Earth;
