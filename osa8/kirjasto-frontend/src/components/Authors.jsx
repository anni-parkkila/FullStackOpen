import { useState } from 'react'
import Select from 'react-select'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Authors = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(EDIT_AUTHOR)

  if (!authors) {
    return null
  }

  const options = authors.map((a) => {
    return { value: a.name, label: a.name }
  })

  const submit = async (event) => {
    event.preventDefault()
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
            <Select
              defaultValue={null}
              onChange={(choice) => setName(choice.value)}
              options={options}
            />
          </div>
          <div>
            born:{' '}
            <input
              type="number"
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
