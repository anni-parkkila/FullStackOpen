import { useState } from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.header}</h1>
    </div>
  );
};

const Button = (props) => (
  <button onClick={props.buttonClick}>{props.text}</button>
);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const numberOfAnecdotes = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [allVotes, setVote] = useState(new Array(numberOfAnecdotes).fill(0));

  const updatedVotes = [...allVotes];
  console.log("updatedVotes=", updatedVotes);

  const [most, setMost] = useState(0);

  const voteAnecdote = () => {
    updatedVotes[selected] += 1;
    setVote(updatedVotes);
    setMost(updatedVotes.indexOf(Math.max(...updatedVotes)));
  };
  console.log("most", most);

  return (
    <div>
      <Header header={"Anecdote of the day"} />
      {anecdotes[selected]}
      <br></br>
      Has {allVotes[selected]} votes.
      <br></br>
      <Button buttonClick={voteAnecdote} text="vote" />
      <Button
        buttonClick={() => setSelected(getRandomInt(numberOfAnecdotes))}
        text="next anecdote"
      />
      <Header header={"Anecdote with most votes"} />
      {anecdotes[most]}
      <br></br>
      has {updatedVotes[most]} votes
    </div>
  );
};

export default App;
