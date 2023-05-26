import React, { useEffect } from "react";
import "animate.css";

const WelcomeView = () => {
  useEffect(() => {
    const animateHeading = () => {
      const heading = document.querySelector(".card-title");
      heading.classList.add("animate__animated", "animate__bounceIn");
    };

    animateHeading();
  }, []);

  return (
    <div>
      <h2 className="card-title">Witaj w Say Me!</h2>
      <p className="card-text">
        Zobacz pytanie, udziel poprawnej odpowiedzi, wygraj!
      </p>
    </div>
  );
};

export default WelcomeView;
