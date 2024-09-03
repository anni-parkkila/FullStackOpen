import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { newNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(newNotification(`"${content}" was added to anecdotes`, 10))
  }

  return(
    <div>
      <h2>Create new anecdote</h2>
        <form onSubmit={addAnecdote}>
          <div><input name='anecdote' /></div>
          <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm