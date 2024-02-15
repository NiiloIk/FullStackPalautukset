import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommend from "./components/Recommend";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(
    { ...query, variables: { genre: null } },
    ({ allBooks }) => {
      return {
        allBooks: uniqByName(allBooks.concat(addedBook)),
      };
    }
  );

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      setError(`${addedBook.title} added`);
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook);
    },
  });

  useEffect(() => {
    const savedToken = localStorage.getItem("library-user-token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <Router>
      <div>
        <button>
          <Link to="/">authors</Link>
        </button>
        <button>
          <Link to="/books">books</Link>
        </button>
        {!token && (
          <button>
            <Link to="/login">login</Link>
          </button>
        )}
        {token && (
          <>
            <button>
              <Link to="/add">add book</Link>
            </button>
            <button>
              <Link to="/recommend">recommend</Link>
            </button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Notify errorMessage={error} setErrorMessage={setError} />

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/recommend" element={<Recommend />} />
        <Route
          path="/login"
          element={<LoginForm setToken={setToken} setError={setError} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
