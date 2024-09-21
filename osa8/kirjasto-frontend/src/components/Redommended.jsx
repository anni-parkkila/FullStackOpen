import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Recommended = ({ books, genre }) => {
  const [booksToShow, setBooksToShow] = useState([])

  const result = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    skip: !genre,
  })

  useEffect(() => {
    if (result.data) {
      setBooksToShow(result.data.allBooks)
    }
  }, [books, result.data])

  return (
    <div>
      <h2>Recommendations</h2>
      Books in your favorite genre: <strong>{genre}</strong>
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

export default Recommended
