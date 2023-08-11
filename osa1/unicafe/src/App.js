import { useState } from "react";

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const all = good + neutral + bad;

  return (
    <div>
      <h1>Give feedback</h1>
      <button
        onClick={() => {
          console.log("good");
          setGood(good + 1);
        }}
      >
        good
      </button>
      <button
        onClick={() => {
          console.log("neutral");
          setNeutral(neutral + 1);
        }}
      >
        neutral
      </button>
      <button
        onClick={() => {
          console.log("bad");
          setBad(bad + 1);
        }}
      >
        bad
      </button>

      <h2>Statistics</h2>

      <p>
        Good {good}
        <br></br>
        Neutral {neutral}
        <br></br>
        Bad {bad}
        <br></br>
        All {all}
        <br></br>
        Average {(good - bad) / all}
        <br></br>
        Positive {(good / all) * 100}%
      </p>
    </div>
  );
};

export default App;
