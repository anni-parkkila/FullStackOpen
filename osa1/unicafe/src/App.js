import { useState } from "react";

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  if (all > 0) {
    return (
      <div>
        Good {props.good}
        <br></br>
        Neutral {props.neutral}
        <br></br>
        Bad {props.bad}
        <br></br>
        All {all}
        <br></br>
        Average {(props.good - props.bad) / all}
        <br></br>
        Positive {(props.good / all) * 100}%
      </div>
    );
  } else {
    return <div>No feedback given</div>;
  }
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
