import React, { useState, useEffect } from "react";

type DrawOption = {
  text: string;
};

type Props = {
  options: DrawOption[];
  onAnimationEnd: (selectedOption: DrawOption) => void;
};

const DrawOptionsAnimation: React.FC<Props> = ({ options, onAnimationEnd }) => {
  const [selectedOption, setSelectedOption] = useState<DrawOption | null>(null);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * options.length);
      setSelectedOption(options[randomIndex]);
    }, 100);

    const animationTimeout = setTimeout(() => {
      clearInterval(animationInterval);
      if (selectedOption) {
        onAnimationEnd(selectedOption);
      }
    }, 3000);

    return () => {
      clearInterval(animationInterval);
      clearTimeout(animationTimeout);
    };
  }, [options, selectedOption, onAnimationEnd]);

  return (
    <div>
      {selectedOption && (
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
          {selectedOption.text}
        </h2>
      )}
      <p>Waiting for the final result...</p>
    </div>
  );
};

export default DrawOptionsAnimation;
