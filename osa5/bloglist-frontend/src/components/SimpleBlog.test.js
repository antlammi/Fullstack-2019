import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'
afterEach(cleanup)

let blog
beforeEach(() => {
  blog ={
    title: 'Koodarielämää',
    author: 'Matti Meikäläinen',
    likes: 5
  }


})
test('renders content', () => {
  let component = render(
    <SimpleBlog blog = {blog} onClick={(() => console.log('xD'))}/>
  )
  const div = component.container.querySelector('.info')
  const div2 = component.container.querySelector('.likes')

  expect(div).toHaveTextContent('Koodarielämää')
  expect(div).toHaveTextContent('Matti Meikäläinen')


  expect(div2).toHaveTextContent('blog has 5 likes')
})

test('like button functions correctly', () => {
  let clicks = 0
  let component = render(
    <SimpleBlog blog = {blog} onClick={(() => clicks = clicks+1)}/>
  )
  const button = component.container.querySelector('button')
  fireEvent.click(button)

  expect(clicks).toEqual(1)

  fireEvent.click(button)
  fireEvent.click(button)

  expect(clicks).toEqual(3)
})

