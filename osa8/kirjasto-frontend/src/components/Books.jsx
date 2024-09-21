import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Books = ({ books, genreFilter, setGenreFilter }) => {
  const [genres, setGenres] = useState([])
  const [booksToShow, setBooksToShow] = useState([])
  console.log('genreFilter', genreFilter)

  useEffect(() => {
    setGenres([...new Set(books?.flatMap((book) => book.genres))])
  }, [books])

  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre: genreFilter },
    skip: !genreFilter,
  })

  useEffect(() => {
    if (genreFilter && result.data) {
      setBooksToShow(result.data.allBooks)
    } else {
      setBooksToShow(books)
    }
  }, [genreFilter, result.data, books])

  return (
    <div>
      <h2>Books</h2>
      <div>
        {genres.map((g) => (
          <button key={g} type="button" onClick={() => setGenreFilter(g)}>
            {g}
          </button>
        ))}
        <button key="all" type="button" onClick={() => setGenreFilter('')}>
          all genres
        </button>
      </div>
      <div style={{ marginTop: 30 }}>
        Books in genre: <strong>{genreFilter}</strong>
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
