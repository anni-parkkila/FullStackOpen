import { createSlice } from '@reduxjs/toolkit'
import { newNotification } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'loggedUser',
  initialState: null,
  reducers: {
    setLoggedUser(state, action) {
      return action.payload
    },
  },
})

export const { setLoggedUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedPlokiappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setLoggedUser(user))
      dispatch(newNotification('Login successful', 5))
    } catch (exception) {
      dispatch(newNotification('ERROR: Wrong username or password', 5))
    }
  }
}

export default userSlice.reducer
