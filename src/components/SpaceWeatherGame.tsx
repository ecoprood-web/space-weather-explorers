import { useState, useEffect } from "react";
import LandingScene from "./scenes/LandingScene";
import Scene1MeetSol from "./scenes/Scene1MeetSol";
import Scene2Trouble from "./scenes/Scene2Trouble";
import Scene3Earth from "./scenes/Scene3Earth";
import Scene4Quiz from "./scenes/Scene4Quiz";
import Scene5Celebration from "./scenes/Scene5Celebration";

const SpaceWeatherGame = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [playerName, setPlayerName] = useState("");
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleStartGame = (name: string) => {
    setPlayerName(name);
    localStorage.setItem("playerName", name);
    setCurrentScene(1);
  };

  const nextScene = () => {
    setCurrentScene((prev) => prev + 1);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    localStorage.setItem("quizScore", score.toString());
    nextScene();
  };

  const resetGame = () => {
    setCurrentScene(0);
    setQuizScore(0);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {currentScene === 0 && <LandingScene onStart={handleStartGame} />}
      {currentScene === 1 && <Scene1MeetSol playerName={playerName} onNext={nextScene} />}
      {currentScene === 2 && <Scene2Trouble playerName={playerName} onNext={nextScene} />}
      {currentScene === 3 && <Scene3Earth playerName={playerName} onNext={nextScene} />}
      {currentScene === 4 && <Scene4Quiz playerName={playerName} onComplete={handleQuizComplete} />}
      {currentScene === 5 && <Scene5Celebration playerName={playerName} score={quizScore} onPlayAgain={resetGame} />}
    </div>
  );
};

export default SpaceWeatherGame;
