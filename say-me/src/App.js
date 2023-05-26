import React, { useEffect } from "react";
import ConfigurationMode from "./ConfigurationMode";
import "animate.css/animate.min.css";
import "animate.css";

const App = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      const title = document.querySelector(".animated");
      if (title) {
        title.classList.remove("animate__animated", "animate__shakeX");
        void title.offsetWidth;
        title.classList.add("animate__animated", "animate__shakeX");
      }
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <h1 className="text-center mt-5 animate__animated animate__shakeX animated">
        Say Me!
      </h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <ConfigurationMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
