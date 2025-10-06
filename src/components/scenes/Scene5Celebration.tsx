import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import solHappy from "@/assets/sol-happy.svg";
import alexAstronaut from "@/assets/alex-astronaut.svg";
import lunaScientist from "@/assets/luna-scientist.svg";

interface Scene5Props {
  playerName: string;
  score: number;
  onPlayAgain: () => void;
}

const Scene5Celebration = ({ playerName, score, onPlayAgain }: Scene5Props) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary via-secondary to-primary flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Confetti effect */}
      {showConfetti && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full animate-fade-in"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10%`,
                backgroundColor: [
                  "#FFD95A",
                  "#FFB84C",
                  "#AEE3F5",
                  "#FFFFFF",
                  "#FF69B4",
                ][Math.floor(Math.random() * 5)],
                animation: `fall ${2 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>

      {/* Fireworks effect */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl animate-zoom-in">
        <h1 className="text-6xl font-bold text-white mb-8 drop-shadow-2xl animate-fade-in">
          🎉 Congratulations! 🎉
        </h1>

        <Card className="p-12 bg-card/95 backdrop-blur-sm rounded-3xl shadow-2xl mb-8">
          <h2 className="text-4xl font-bold text-card-foreground mb-6">
            You're now an official Space Weather Hero! 🌟
          </h2>
          
          <div className="bg-primary/10 rounded-2xl p-6 mb-8">
            <p className="text-5xl font-bold text-primary mb-2">{playerName}</p>
            <p className="text-2xl text-card-foreground">
              Final Score: {score} / 5
            </p>
            {score === 5 && (
              <p className="text-3xl font-bold text-secondary mt-4">
                Perfect Score! Amazing! ⭐⭐⭐
              </p>
            )}
            {score >= 3 && score < 5 && (
              <p className="text-2xl font-bold text-secondary mt-4">
                Great work! 🌟
              </p>
            )}
          </div>

          {/* Characters celebrating */}
          <div className="flex items-center justify-around mb-8">
            <div className="text-center animate-float">
              <img src={solHappy} alt="Sol" className="w-32 h-32 mx-auto" />
              <p className="text-lg font-bold mt-2 text-card-foreground">
                "You're amazing!"
              </p>
            </div>
            <div className="text-center animate-float-slow">
              <img src={alexAstronaut} alt="Alex" className="w-36 h-36 mx-auto" />
              <p className="text-lg font-bold mt-2 text-card-foreground">
                "You saved my satellite!"
              </p>
            </div>
            <div className="text-center animate-float">
              <img src={lunaScientist} alt="Luna" className="w-40 h-40 mx-auto" />
              <p className="text-lg font-bold mt-2 text-card-foreground">
                "You understand space weather!"
              </p>
            </div>
          </div>

          <div className="bg-accent/50 rounded-2xl p-6 mb-6">
            <h3 className="text-2xl font-bold text-card-foreground mb-3">
              🏆 Certificate of Achievement 🏆
            </h3>
            <p className="text-xl text-card-foreground">
              This certifies that <span className="font-bold text-primary">{playerName}</span> has
              successfully completed the Space Weather Adventure and is now a certified
              <span className="font-bold text-secondary"> Space Weather Hero</span>!
            </p>
          </div>
        </Card>

        <div className="flex gap-6 justify-center">
          <Button
            onClick={onPlayAgain}
            size="lg"
            className="text-2xl py-8 px-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            Play Again 🔄
          </Button>
        </div>

        <div className="mt-8 text-white/90 text-lg">
          <p>
            Learn more about space weather at{" "}
            <a
              href="https://www.nasa.gov/mission_pages/sunearth/spaceweather/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-primary font-bold"
            >
              NASA Space Weather
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scene5Celebration;
