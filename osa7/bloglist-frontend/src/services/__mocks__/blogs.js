const blogs = [
  {
    id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'Matti Meikäläinen',
    url: 'http://wowhead.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c7ce',
    title: 'Kaikenlaisia Koodikikkoja',
    author: 'Kalle Koodari',
    url: 'http://soundcloud.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    id: '5a451df7571c224a31b5c6ce',
    title: 'Vastaus kaikkeen',
    author: 'Kalle Koodari',
    url: 'http://google.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]
const setToken = (props) => { console.log('token set for mock blog, ', props.token) }
const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }