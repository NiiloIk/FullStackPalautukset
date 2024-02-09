const express = require('express')
const commentsRouter = express.Router({ mergeParams: true })
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentsRouter.get('/', async (request, response) => {
    try {
        console.log(request.params.id)
        const blog = await Blog.findById(request.params.id)
        const comments = await Comment.find({ blog: request.params.id })
        response.json(comments)
    } catch (error) {
        response.status(500).json({ error: 'Internal server error' })
    }
})

commentsRouter.post('/', async (request, response) => {
    const { content } = request.body

    const comment = new Comment({
        content,
        blog: request.params.id
      })
      
    const savedComment = await comment.save()
    
    response.status(201).json(savedComment)
})

module.exports = commentsRouter;