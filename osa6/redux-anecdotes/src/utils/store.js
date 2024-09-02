import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from '../reducers/anecdoteReducer'
import filterReducer from '../reducers/filterReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer
  }, devTools: true
})

export default store