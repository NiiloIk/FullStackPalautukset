import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_GENRES } from "../queries";
import { useEffect, useState } from "react";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState(null);

  const genresResult = useQuery(ALL_GENRES);
  const result = useQuery(ALL_BOOKS, {
    variables: { genre },
  });

  useEffect(() => {
    if (genresResult && genresResult.data) {
      const booksData = genresResult.data.allBooks;
      const newGenres = booksData.reduce((genres, book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)) {
            genres.push(genre);
          }
        });
        return genres;
      }, []);
      setGenres(newGenres);
    }
  }, [genresResult.data]);

  useEffect(() => {
    if (result.data && result.data.allBooks) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  if (result.loading || genresResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>
      {genre && (
        <p>
          Set genre <b>{genre}</b>
        </p>
      )}

      <button key="All" onClick={() => setGenre(null)}>
        All
      </button>
      {genres &&
        genres.map((genre) => (
          <button key={genre} onClick={() => setGenre(genre)}>
            {genre}
          </button>
        ))}

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
