import { useState } from "react";

const Statistics = (props) => (
  <div>
    <h2>Statistics</h2>
    Good {props.good}
    <br></br>
    Neutral {props.neutral}
    <br></br>
    Bad {props.bad}
    <br></br>
    All {props.all}
    <br></br>
    Average {(props.good - props.bad) / props.all}
    <br></br>
    Positive {(props.good / props.all) * 100}%
  </div>
);

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
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />
    </div>
  );
};

export default App;
