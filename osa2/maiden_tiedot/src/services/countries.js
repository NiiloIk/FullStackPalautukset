import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data)
}

const getOne = id => {
    const request = axios.get(`${baseUrl}/name/${id}`)
    return request.then(response => response.data)
}
/*
const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
    console.log(id)
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}*/


export default { 
  getAll, getOne
}