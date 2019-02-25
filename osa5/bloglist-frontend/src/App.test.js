import React from 'react'
import { render, waitForElement } from 'react-testing-library'
import App from './App'
jest.mock('./services/blogs')
describe('<App />', () => {
  it ('if no user logged, notes are not rendered', async() => {
    const component = render(<App/>)
    component.rerender(<App/>)

    await waitForElement(() => component.getByText('kirjaudu'))
    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)
  })
  it('renders all blogs it gets from backend', async () => {
    const user = {
      username: 'tester',
      token:'1231231214',
      name: 'Teuvo Testaaja'
    }

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)
    await waitForElement(() => component.container.querySelectorAll('.blog'))

    expect(component.container).toHaveTextContent('HTML on helppoa')

    expect(component.container).toHaveTextContent('Kaikenlaisia Koodikikkoja')

    expect(component.container).toHaveTextContent('Vastaus kaikkeen')
  })
})