import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ books }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState('')
  let booksToShow = []

  useEffect(() => {
    setGenres([...new Set(books?.flatMap((book) => book.genres))])
  }, [books])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (genre && result.data) {
    booksToShow = result.data.allBooks
  } else {
    booksToShow = books
  }

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map((g) => (
          <button key={g} type="button" onClick={() => setGenre(g)}>
            {g}
          </button>
        ))}
        <button key="all" type="button" onClick={() => setGenre('')}>
          all genres
        </button>
      </div>
      <div style={{ marginTop: 30 }}>
        Books in genre: <strong>{genre}</strong>
      </div>
      <table style={{ maxWidth: 800 }}>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td width="70%">{a.title}</td>
              <td width="20%">{a.author.name}</td>
              <td width="10%">{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
