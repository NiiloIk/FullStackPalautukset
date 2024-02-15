const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const { GraphQLError } = require("graphql");
const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return null;

        return Book.find({
          genres: args.genre,
          author: author.id,
        }).populate("author");
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) return null;

        return Book.find({ author: author.id }).populate("author");
      }
      if (args.genre) {
        return Book.find({ genres: args.genre }).populate("author");
      }

      return Book.find({}).populate("author");
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});

      // kirjat ja kirjoittajat haetaan vain kerran.
      return authors.map((author) => {
        const bookCount = books.reduce((count, book) => {
          return book.author.toString() === author.id.toString()
            ? count + 1
            : count;
        }, 0);

        return {
          name: author.name,
          bookCount,
          id: author.id.toString(),
          born: author.born,
        };
      });
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const authorExists = await Author.findOne({ name: args.author });

      let author = null;
      if (authorExists) {
        author = authorExists;
      } else {
        try {
          author = await new Author({ name: args.author }).save();
        } catch (error) {
          throw new GraphQLError(
            "Author name too short. Saving author failed",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            }
          );
        }
      }

      const book = new Book({ ...args, author: author.id });
      await book.save().catch((error) => {
        throw new GraphQLError("Creating book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });

      pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });

      return book.populate("author");
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      await author.save();

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
