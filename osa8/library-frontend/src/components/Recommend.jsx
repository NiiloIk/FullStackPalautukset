import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_USER } from '../queries'

const Recommend = () => {
  const result = useQuery(ALL_BOOKS)
  const user = useQuery(GET_USER)


  if (result.loading || user.loading) {
    return <div>loading...</div>
  }
  const genre = user.data.me.favoriteGenre
  const username = user.data.me.username
  const books = result.data.allBooks


  const bookList = genre 
    ? books.filter(book => book.genres.includes(genre))
    : books

  return (
    <div>
      <h2>{username} recommendations</h2>

      <p>books in your favourite genre <b>{genre}</b></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookList.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend
