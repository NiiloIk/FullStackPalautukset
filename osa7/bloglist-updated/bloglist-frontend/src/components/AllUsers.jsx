import { Table } from "react-bootstrap"

const AllUsersViews = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td>
              <b>User</b>
            </td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
          {users &&
            users.map(user => (
              <tr key={user.id}>
                <td>
                  <a href={`/users/${user.id}`}>{user.name}</a>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AllUsersViews
