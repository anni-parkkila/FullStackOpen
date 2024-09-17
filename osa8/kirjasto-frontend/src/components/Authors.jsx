import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR)

  if (!authors) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('edit born')
    updateAuthor({ variables: { name, born } })
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 30 }}>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            name:{' '}
            <input
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div>
            born:{' '}
            <input
              value={born}
              onChange={({ target }) => setBorn(Number(target.value))}
            />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
