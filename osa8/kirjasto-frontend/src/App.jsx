import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const App = () => {
  const padding = {
    padding: 5,
  };

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h1>Library</h1>
      <div>
        <Link style={padding} to="/">
          Authors
        </Link>
        <Link style={padding} to="/books">
          Books
        </Link>
        <Link style={padding} to="/add">
          Add book
        </Link>
      </div>

      <Routes>
        <Route
          path="/"
          element={<Authors authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  );
};

export default App;
