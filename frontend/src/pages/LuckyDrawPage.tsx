import React, { useState, useEffect } from "react";
import DrawOptionsAnimation from "../components/DrawOptionsAnimation";
import * as apiClient from "../api-client";

const LuckyDrawPage: React.FC = () => {
  const [drawResult, setDrawResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [alreadyParticipated, setAlreadyParticipated] = useState(false);

  useEffect(() => {
    const checkParticipation = async () => {
      try {
        const response = await apiClient.checkParticipation();
        setAlreadyParticipated(response.alreadyParticipated);
      } catch (error) {
        console.error("Error checking participation:", error);
      }
    };
    checkParticipation();
  }, []);

  const handleParticipateInDraw = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.participateInDraw();
      setDrawResult(response.result);
    } catch (error) {
      console.error("Error participating in draw:", error);
      // Handle error
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnimationEnd = (selectedOption: { text: string }) => {
    setDrawResult(selectedOption.text);
    if (
      selectedOption.text === "10% discount" ||
      selectedOption.text === "20% discount" ||
      selectedOption.text === "Free weekend at a hotel" ||
      selectedOption.text === "Complimentary tours and activities" ||
      selectedOption.text === "Travel-themed gift baskets"
    ) {
      alert(
        "Congratulations on your win! To finalize the process and claim your prize, please contact us at beyond.horizon1234@gmail.com"
      );
    }
  };

  // Définition des options de tirage au sort
  const options = [
    { text: "Unfortunately, you didn't score a win this time!" },
    { text: "Better luck next attempt! Try your luck again next week." },
    { text: "Unfortunately, you didn't win this time. Don't reel in the disappointment! There are plenty more chances to win." },
    { text: "Sorry, you didn't win this time. Stay tuned for more opportunities to win in the future!" },
    { text: "10% discount" },
    { text: "20% discount" },
    { text: "Free weekend at a hotel" },
    { text: "Complimentary tours and activities" },
    { text: "Travel-themed gift baskets" }
  ];

  return (
    <div>
      <h1>Welcome to the Lucky Draw!</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : alreadyParticipated ? (
        <p>You have already participated in the draw this week.</p>
      ) : drawResult ? (
        <div>
          <h2>Result: {drawResult}</h2>
          {drawResult.includes("discount") ? (
            <p>
              Congratulations on your win! To finalize the process and claim your prize, please contact us at{" "}
              <a href="mailto:beyond.horizon1234@gmail.com">beyond.horizon1234@gmail.com</a>
            </p>
          ) : null}
          <button onClick={() => setDrawResult(null)}>Try Again</button>
        </div>
      ) : (
        <div>
          {/* Utilisation du composant DrawOptionsAnimation avec les options */}
          <DrawOptionsAnimation
            options={options}
            onAnimationEnd={handleAnimationEnd}
          />
          <button onClick={handleParticipateInDraw} disabled={alreadyParticipated}>
            Participate in Draw
          </button>
        </div>
      )}
    </div>
  );
};

export default LuckyDrawPage;
