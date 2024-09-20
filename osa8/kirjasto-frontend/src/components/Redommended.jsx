import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommended = ({ genre }) => {
  let booksToShow = []

  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
    skip: !genre,
  })

  if (genre && result.data) {
    booksToShow = result.data.allBooks
  }

  return (
    <div>
      <h2>Recommendations</h2>
      Books in your favorite genre
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
