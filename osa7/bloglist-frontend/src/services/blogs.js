import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl,newObject,config)
  return response.data
}
const remove = async id => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(id)
  const fullUrl = baseUrl+'/'+id
  const response = await axios.delete(fullUrl, config)
  return response.data
}

const put = async blog => {
  const config = {
    headers: { Authorization: token },
  }
  const updated_blog = { ...blog, likes: blog.likes+1 }
  const id = updated_blog.id
  console.log(id)
  delete updated_blog.user
  delete updated_blog.id
  console.log(updated_blog)



  const fullUrl = baseUrl + '/' + id
  console.log(fullUrl)
  const response = await axios.put(fullUrl, updated_blog, config)
  console.log(response.data)
  return response.data
}

export default { getAll,create,setToken, put, remove }