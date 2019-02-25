import axios from 'axios'
const baseUrl = 'api/login'

const login = async credentials => {
  let postable = {
    username: credentials.username.value,
    password: credentials.password.value
  }
  const response = await axios.post(baseUrl, postable)
  return response.data
}

export default { login }