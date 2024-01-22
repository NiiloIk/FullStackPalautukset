const Blog = require('../models/blog')

const initialBlogs = [
    {
        "title": "I hate blogs",
        "author": "Pauli P",
        "url": "https://fullstackopen.com/",
        "likes": 4,
        "id": "65a8f3c66d37584f04900148"
    },
    {
        "title": "I am the greatest WWE wrestler!!!",
        "author": "Rick Flair",
        "url": "https://fullstackopen.com/",
        "likes": 11,
        "id": "65a90b0844148d381d0659b3"
    },
    {
        "title": "Does this blog even work",
        "author": "Niilo Ikonen",
        "url": "https://www.google.fi/?hl=fi",
        "likes": 5,
        "id": "65a91cfb0736e6edf4ae7bec"
    }
]

const newBlog = {
    "title": "new blog",
    "author": "Aku Ankka",
    "url": "https://www.google.fi/?hl=fi",
    "likes": 3,
}
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, newBlog, blogsInDb
}