import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
afterEach(cleanup)
test('renders content', () => {
  const blog ={
    title: 'Koodarielämää',
    author: 'Matti Meikäläinen',
    likes: 5
  }

  let component = render(
    <SimpleBlog blog = {blog} onClick={(() => console.log('xD'))}/>
  )
  const div = component.container.querySelector('.info')
  const div2 = component.container.querySelector('.likes')

  expect(div).toHaveTextContent('Koodarielämää')
  expect(div).toHaveTextContent('Matti Meikäläinen')


  expect(div2).toHaveTextContent('blog has 5 likes')
})

