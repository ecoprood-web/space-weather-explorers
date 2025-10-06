import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import solWaving from "@/assets/sol-waving.svg";
import clouds from "@/assets/clouds.svg";

interface LandingSceneProps {
  onStart: (name: string) => void;
}

const LandingScene = ({ onStart }: LandingSceneProps) => {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating clouds */}
      <img 
        src={clouds} 
        alt="" 
        className="absolute top-10 left-10 w-48 opacity-60 animate-float"
      />
      <img 
        src={clouds} 
        alt="" 
        className="absolute top-32 right-20 w-56 opacity-50 animate-float-slow"
      />
      <img 
        src={clouds} 
        alt="" 
        className="absolute bottom-20 left-1/4 w-40 opacity-70 animate-float"
      />

      {/* Stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-full animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        {/* Sol waving */}
        <img 
          src={solWaving} 
          alt="Sol the Sun waving" 
          className="w-64 h-64 mx-auto mb-8 animate-float"
        />

        <h1 className="text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
          Welcome to Space Weather Adventure!
        </h1>
        
        <p className="text-2xl text-foreground/80 mb-12 font-medium">
          Learn how the Sun affects life on Earth!
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-card/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl">
            <label htmlFor="playerName" className="text-2xl font-bold text-card-foreground block mb-4">
              What's your name, young explorer?
            </label>
            <Input
              id="playerName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="text-2xl py-6 px-6 text-center border-4 border-primary/30 focus:border-primary rounded-2xl"
              required
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="text-3xl py-8 px-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-xl hover:scale-105 transition-transform"
          >
            Start the Journey! 🚀
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LandingScene;
