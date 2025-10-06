import { useState } from "react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/TypewriterText";
import { toast } from "sonner";
import solTalking from "@/assets/sol-talking.svg";
import alexAstronaut from "@/assets/alex-astronaut.svg";
import satellite from "@/assets/satellite.svg";

interface Scene2Props {
  playerName: string;
  onNext: () => void;
}

const Scene2Trouble = ({ playerName, onNext }: Scene2Props) => {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [repairedParts, setRepairedParts] = useState<number[]>([]);

  const dialogues = [
    "Oops! I just sent out a big solar flare!",
    "Oh no! My satellite stopped working!",
    "Can you help me fix it?",
  ];

  const totalParts = 4;

  const handleNext = () => {
    if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      setGameStarted(true);
    }
  };

  const handleRepairPart = (partIndex: number) => {
    if (!repairedParts.includes(partIndex)) {
      setRepairedParts([...repairedParts, partIndex]);
      toast.success("Part fixed! ⚡");

      if (repairedParts.length + 1 === totalParts) {
        setTimeout(() => {
          toast.success(`Great job, ${playerName}! You saved my mission!`, {
            duration: 3000,
          });
          setTimeout(onNext, 2000);
        }, 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--space-dark))] to-black flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
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

      {!gameStarted ? (
        <>
          {/* Characters */}
          <div className="relative z-10 flex items-center justify-around w-full max-w-5xl mb-8 animate-fade-in">
            <div className="text-center">
              <img 
                src={solTalking} 
                alt="Sol" 
                className="w-48 h-48 animate-float"
              />
              <p className="text-primary font-bold text-xl mt-2">Sol</p>
            </div>
            <div className="text-center">
              <img 
                src={alexAstronaut} 
                alt="Alex the Astronaut" 
                className="w-56 h-56 animate-float-slow"
              />
              <p className="text-accent font-bold text-xl mt-2">Alex</p>
            </div>
          </div>

          {/* Dialogue box */}
          <div className="relative z-10 bg-card/95 backdrop-blur-sm p-8 rounded-3xl shadow-2xl max-w-3xl w-full animate-slide-up">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">{dialogueIndex < 1 ? "☀️" : "👨‍🚀"}</span>
              </div>
              <p className="text-lg font-bold text-card-foreground">
                {dialogueIndex < 1 ? "Sol" : "Alex"}
              </p>
            </div>
            <TypewriterText
              text={dialogues[dialogueIndex]}
              className="text-2xl font-medium text-card-foreground min-h-[80px] flex items-center"
            />

            <div className="mt-8 text-center">
              <Button
                onClick={handleNext}
                size="lg"
                className="text-2xl py-6 px-10 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
              >
                Continue
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="relative z-10 animate-zoom-in">
          <h2 className="text-4xl font-bold text-primary text-center mb-8">
            Fix the Satellite! Click on the broken parts
          </h2>
          
          <div className="relative">
            <img 
              src={satellite} 
              alt="Satellite" 
              className="w-96 h-96 mx-auto"
            />
            
            {/* Clickable broken parts */}
            {[
              { top: "20%", left: "30%", label: "Solar Panel" },
              { top: "40%", left: "70%", label: "Antenna" },
              { top: "60%", left: "25%", label: "Sensor" },
              { top: "70%", left: "65%", label: "Communication" },
            ].map((part, index) => (
              <button
                key={index}
                onClick={() => handleRepairPart(index)}
                disabled={repairedParts.includes(index)}
                className={`absolute w-16 h-16 rounded-full border-4 transition-all ${
                  repairedParts.includes(index)
                    ? "bg-primary border-primary cursor-not-allowed"
                    : "bg-destructive/80 border-destructive animate-pulse hover:scale-125 cursor-pointer"
                }`}
                style={{ top: part.top, left: part.left }}
              >
                {repairedParts.includes(index) ? "✓" : "⚠️"}
              </button>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-2xl font-bold text-white">
              Parts Fixed: {repairedParts.length} / {totalParts}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scene2Trouble;
