import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getComments = async id => {
  const response = await axios.get(`${baseUrl}/${id}/comments`)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, { content: comment })
  return response.data
}

export default { getComments, addComment }