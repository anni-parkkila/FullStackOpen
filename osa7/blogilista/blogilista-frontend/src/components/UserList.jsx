import { useSelector } from 'react-redux'

const UserList = () => {
  const users = useSelector((state) => state.users)
  console.log('users', users)

  return (
    <div className="userlist">
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
