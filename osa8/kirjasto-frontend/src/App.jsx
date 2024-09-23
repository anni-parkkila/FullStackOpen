import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  BOOK_ADDED,
  BOOKS_BY_GENRE,
  ME,
} from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommended from './components/Redommended'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [genreFilter, setGenreFilter] = useState('')
  const client = useApolloClient()
  const userResult = useQuery(ME)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (token) {
      userResult.startPolling(500)
      setTimeout(() => {
        userResult.stopPolling()
      }, 3000)
      setUser(userResult.data)
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(
        `New book added or fetched from server: "${addedBook.title}" by ${addedBook.author.name}`
      )
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
      addedBook.genres.map((g) => {
        updateCache(
          client.cache,
          { query: BOOKS_BY_GENRE, variables: { genre: g } },
          addedBook
        )
      })
    },
  })

  if (resultAuthors.loading || resultBooks.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const padding = {
    padding: 5,
  }

  if (!token || !user) {
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
          <Link style={padding} to="/login">
            Login
          </Link>
        </div>
        <Notification message={message} />
        <Routes>
          <Route
            path="/"
            element={<Authors authors={resultAuthors.data.allAuthors} />}
          />
          <Route
            path="/books"
            element={
              <Books
                books={resultBooks.data.allBooks}
                genreFilter={genreFilter}
                setGenreFilter={setGenreFilter}
              />
            }
          />
          <Route
            path="/login"
            element={<LoginForm setToken={setToken} setError={notify} />}
          />
        </Routes>
      </div>
    )
  }

  return (
    <div>
      <h1>Library</h1>
      <Notification message={message} />
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
        <Link style={padding} to="/recommended">
          Recommended
        </Link>
        <button style={{ marginLeft: 5 }} onClick={logout}>
          logout
        </button>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Authors token={token} authors={resultAuthors.data.allAuthors} />
          }
        />
        <Route
          path="/books"
          element={
            <Books
              books={resultBooks.data.allBooks}
              genreFilter={genreFilter}
              setGenreFilter={setGenreFilter}
            />
          }
        />
        <Route
          path="/add"
          element={<NewBook token={token} setError={notify} />}
        />
        <Route
          path="/recommended"
          element={
            <Recommended
              books={resultBooks.data.allBooks}
              genre={user.me.favoriteGenre}
              setGenreFilter={setGenreFilter}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
