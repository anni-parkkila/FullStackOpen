import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> component', () => {
  let updateLikes
  beforeEach(() => {
    const blog = {
      title: 'Adventures of Sherlock Holmes',
      author: 'John H. Watson',
      url: 'b221.co.uk',
      likes: 7,
      user: {
        username: 'root',
        name: 'SuperUser'
      }
    }
    const user = {
      username: 'root',
      name: 'SuperUser'
    }
    updateLikes = vi.fn()
    render(<Blog blog={blog} updateLikes={updateLikes} user={user}/>)
  })

  test('renders content', () => {
    const title = screen.getByText('Adventures of Sherlock Holmes')
    expect(title).toBeDefined()
  })

  test('at start the blog details are hidden', () => {
    const title = screen.getByText('Adventures of Sherlock Holmes', { exact: false })
    expect(title).toBeDefined()

    const url = screen.queryByText('b221.co.uk')
    expect(url).toBeNull()
  })

  test('details are shown when "view" button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('b221.co.uk', { exact: false })
    expect(url).toBeDefined()

    const likes = screen.getByText('Likes: 7', { exact: false })
    expect(likes).toBeDefined()

    const name = screen.getByText('SuperUser', { exact: false })
    expect(name).toBeDefined()
  })

  test('update likes twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)

    const likes = screen.getByText('Likes:', { exact: false })
    expect(likes).toBeDefined()
    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})