const favouriteBlog = require('../utils/list_helper').favouriteBlog
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const { initialBlogs, newBlog, blogsInDb } = require('./test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('when there is initially seome blogs saved', () => {
    test('Returns the right amount of blogs', async () => {
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(initialBlogs.length)
    })
    
    test('id field is id and not _id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        })
    })
    describe('HTML POST tests', () => {
        test('adding a blog works', async () => {
            await Blog.collection.insertOne(newBlog)
        
            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
        
        
            const blogTitlesAtEnd = blogsAtEnd.map(blog => blog.title)
            expect(blogTitlesAtEnd).toContain(
                newBlog.title
            )
        })
        
        test('adding a blog without likes will set likes to zero', async () => {
            const blogWithoutLikes = {
                "title": "This is a blog without likes", 
                "author": newBlog.author,
                "url": newBlog.url
            }
        
            await Blog.collection.insertOne(blogWithoutLikes)
        
            const blogInDb = await Blog.findOne({ "title": blogWithoutLikes.title })
            expect(blogInDb.likes).toBe(0)
        })
        
        test('adding a blog with no title, returns HTML status 400', async () => {
            const blogWithoutTitle = {
                "author": newBlog.author,
                "url": newBlog.url,
                "likes": newBlog.likes
            }
            await api
                .post('/api/blogs')
                .send(blogWithoutTitle)
                .expect(400)
        })
        
        test('adding a blog with no url, returns HTML status 400', async () => {
            const blogWithoutUrl = {
                "title": "This is a blog that has no url",
                "author": newBlog.author,
                "likes": newBlog.likes
            }
            await api
                .post('/api/blogs')
                .send(blogWithoutUrl)
                .expect(400)
        })
    })
    describe('HTML DELETE tests', () => {
        test('deleting a blog lessens the amount of blogs and returns 204', async () => {
            const blogsAtStart = await blogsInDb()
            const blogToDelete = blogsAtStart[0]

            await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)

            const blogsAtEnd = await blogsInDb()

            expect(blogsAtEnd).toHaveLength(
                initialBlogs.length - 1
            )
            
            const authors = blogsAtEnd.map(r => r.author)
            expect(authors).not.toContain(blogToDelete.author)
        })
    })

    describe('HTML PUT tests', () => {
        test('updating a blogs likes returns 204', async () => {
            const blogsAtStart = await blogsInDb()
            const blogToModify = blogsAtStart[0]

            await api
                .put(`/api/blogs/${blogToModify.id}`)
                .send({ "likes": blogToModify.likes + 200 })
                .expect(204)
            
            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).not.toContain(blogToModify)
        })
        test('updating blogs information returns 204', async () => {
            const blogsAtStart = await blogsInDb()
            const blogToModify = blogsAtStart[0]
            const modifiedBlog = {
                "title": "new title",
                "author": "Tuntematon Sotilas",
                "likes": 20,
                "url": "http://notaworkingurl.com"
            }
            await api
                .put(`/api/blogs/${blogToModify.id}`)
                .send(modifiedBlog)
                .expect(204)
            
            const blogsAtEnd = await blogsInDb()
            expect(blogsAtEnd).not.toContain(blogToModify)
        })
    })
})




afterAll(async () => {
    await mongoose.connection.close()
})