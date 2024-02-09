import { Table } from "react-bootstrap"

const SingleUserView = ({ user }) => {
  if (!user) return null

  return (
    <div>
      <h2>{user.name} blog posts</h2>
      {user.blogs.length === 0 && <p>No blogs</p>}
      {user.blogs.length > 0 && (
        <Table striped>
          <tbody>
            <tr key='title'>
              <td><b>Title</b></td>
              <td><b>Author</b></td>
            </tr>
            {user.blogs.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default SingleUserView
