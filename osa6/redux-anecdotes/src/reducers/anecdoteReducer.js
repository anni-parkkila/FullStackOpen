import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const { appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes.sort((a, b) => b.votes - a.votes)))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = anecdote => {
  return async dispatch => {
    const id = anecdote.id
    const newAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const changedAnecdote = await anecdoteService.update(id, newAnecdote)
    const updatedAnecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(updatedAnecdotes.map(anecdote =>
      anecdote.id !== id ? anecdote : changedAnecdote).sort((a, b) => b.votes - a.votes)))
    }
}

export default anecdoteSlice.reducer