import { useState, useEffect } from "react";
import "./App.css";
import { DiaryEntry } from "./types";
import { getAllDiaryEntries, createDiaryEntry } from "./diaryService";

const App = () => {
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaryEntries().then((data) => {
      console.log("data", data);
      setDiaryEntries(data);
    });
  }, []);

  const diaryEntryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log("create new");
    const newDiaryEntry = {
      date: newDate,
      visibility: newVisibility,
      weather: newWeather,
      comment: newComment,
    };
    createDiaryEntry(newDiaryEntry).then((data) => {
      setDiaryEntries(diaryEntries.concat(data));
    });
    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <h2>Add new entry</h2>
      <form onSubmit={diaryEntryCreation}>
        date:{" "}
        <input
          value={newDate}
          onChange={(event) => setNewDate(event.target.value)}
        />
        <br />
        visibility:{" "}
        <input
          value={newVisibility}
          onChange={(event) => setNewVisibility(event.target.value)}
        />
        <br />
        weather:{" "}
        <input
          value={newWeather}
          onChange={(event) => setNewWeather(event.target.value)}
        />
        <br />
        comment:{" "}
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
      <h2>Diary Entries</h2>
      <div>
        {diaryEntries.map((entry) => {
          return (
            <div key={entry.id}>
              <h3>{entry.date}</h3>
              <ul>
                <li>visibility: {entry.visibility}</li>
                <li>weather: {entry.weather}</li>
              </ul>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default App;
