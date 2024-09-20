import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ books }) => {
  const [genre, setGenre] = useState('')
  let booksToShow = []

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
        <button type="button" onClick={() => setGenre('refactoring')}>
          refactoring
        </button>
        <button type="button" onClick={() => setGenre('agile')}>
          agile
        </button>
        <button type="button" onClick={() => setGenre('patterns')}>
          patterns
        </button>
        <button type="button" onClick={() => setGenre('design')}>
          design
        </button>
        <button type="button" onClick={() => setGenre('crime')}>
          crime
        </button>
        <button type="button" onClick={() => setGenre('classic')}>
          classic
        </button>
        <button type="button" onClick={() => setGenre('')}>
          all genres
        </button>
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
