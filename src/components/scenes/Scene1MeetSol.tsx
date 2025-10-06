import { useState } from "react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/TypewriterText";
import solHappy from "@/assets/sol-happy.svg";

interface Scene1Props {
  playerName: string;
  onNext: () => void;
}

const Scene1MeetSol = ({ playerName, onNext }: Scene1Props) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogues = [
    `Hi ${playerName}! I'm Sol, your space friend!`,
    "I shine bright to give Earth light and warmth.",
    "But sometimes, I get a little stormy. That's called space weather!",
  ];

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--space-dark))] to-[hsl(var(--space-purple))] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Sol character */}
      <div className="relative z-10 mb-8 animate-zoom-in">
        <img 
          src={solHappy} 
          alt="Sol the Sun" 
          className="w-80 h-80 animate-float drop-shadow-2xl"
        />
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl -z-10" />
      </div>

      {/* Dialogue box */}
      <div className="relative z-10 bg-card/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-3xl w-full animate-slide-up">
        <TypewriterText
          text={dialogues[dialogueIndex]}
          className="text-3xl font-bold text-card-foreground text-center min-h-[100px] flex items-center justify-center"
        />

        <div className="mt-8 text-center">
          <Button
            onClick={handleNext}
            size="lg"
            className="text-2xl py-6 px-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            {dialogueIndex < dialogues.length - 1 ? "Continue" : "Show me what happens!"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Scene1MeetSol;
