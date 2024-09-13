import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group className="login">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          data-testid="username"
          type="text"
          value={username}
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <Form.Label>Password:</Form.Label>
        <Form.Control
          data-testid="password"
          type="password"
          value={password}
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>
      <Button style={{ marginTop: 10 }} type="submit">
        login
      </Button>
    </Form>
  )
}
export default LoginForm
