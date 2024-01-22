const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findByIdAndDelete(request.params.id)
    if (!blog) {
        return response.status(404).end();
    }
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const newBlog = {}

    if (body.title) { newBlog.title = body.title }
    if (body.author) { newBlog.author = body.author }
    if (body.url) { newBlog.url = body.url }
    if (body.likes) { newBlog.likes = body.likes }

    const blog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true })
    if (!blog) {
        return response.status(404).end();
    }
    response.status(204).end()
})

module.exports = blogsRouter