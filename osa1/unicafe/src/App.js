import { useState } from "react";

const Button = (props) => (
  <button onClick={props.buttonClick}>{props.text}</button>
);

const StatisticLine = (props) => (
  <div>
    {props.text} {props.value}
  </div>
);

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad;
  if (all > 0) {
    return (
      <div>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={all} />
        <StatisticLine text="Average" value={(props.good - props.bad) / all} />
        <StatisticLine text="Positive" value={(props.good / all) * 100 + "%"} />
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
      <Button buttonClick={() => setGood(good + 1)} text="good" />
      <Button buttonClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button buttonClick={() => setBad(bad + 1)} text="bad" />

      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
