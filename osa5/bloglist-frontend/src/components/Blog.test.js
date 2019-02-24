import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import Blog from './Blog'
afterEach(cleanup)
test('renders content', () => {
  const blog ={
    title: 'Koodarielämää',
    author: 'Matti Meikäläinen',
    url: 'http://yle.fi'
  }

  const component = render(
    <Blog blog = {blog}/>
  )

  expect(component.container).toHaveTextContent('Koodarielämää')
  const element = component.getByText('Koodarielämää Matti Meikäläinen')
  expect(element).toBeDefined()
})

