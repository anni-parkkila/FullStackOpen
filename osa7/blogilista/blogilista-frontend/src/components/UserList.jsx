import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
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
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserList
