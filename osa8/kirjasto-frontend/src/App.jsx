import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { useQuery, useApolloClient } from '@apollo/client'
import { ALL_AUTHORS_AND_BOOKS, ME } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Recommended from './components/Redommended'

const App = () => {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const userResult = useQuery(ME)

  useEffect(() => {
    if (token) {
      userResult.startPolling(500)
      setTimeout(() => {
        userResult.stopPolling()
      }, 3000)
      setUser(userResult.data)
    }
  }, [token])

  const padding = {
    padding: 5,
  }
  console.log('token', token)
  console.log('user', user)

  const result = useQuery(ALL_AUTHORS_AND_BOOKS)

  console.log('result', result.data)

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
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
        <Notification errorMessage={errorMessage} />
        <Routes>
          <Route
            path="/"
            element={<Authors authors={result.data.allAuthors} />}
          />
          <Route
            path="/books"
            element={<Books books={result.data.allBooks} />}
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
          element={<Authors token={token} authors={result.data.allAuthors} />}
        />
        <Route path="/books" element={<Books books={result.data.allBooks} />} />
        <Route
          path="/add"
          element={<NewBook token={token} setError={notify} />}
        />
        <Route
          path="/recommended"
          element={
            <Recommended
              books={result.data.allBooks}
              genre={user.me.favoriteGenre}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
