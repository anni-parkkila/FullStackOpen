import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const addBlog = vi.fn()

    render(<BlogForm createBlog={addBlog} />)

    const title = screen.getByPlaceholderText('blog title')
    const author = screen.getByPlaceholderText('blog author')
    const url = screen.getByPlaceholderText('blog url')
    const submitButton = screen.getByText('add')

    await user.type(title, 'Adventures of Sherlock Holmes')
    await user.type(author, 'John H. Watson')
    await user.type(url, 'b221.co.uk')
    await user.click(submitButton)

    const emptiedTitle = screen.queryByText('Adventures of Sherlock Holmes')
    expect(emptiedTitle).toBeNull()

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('Adventures of Sherlock Holmes')
    expect(addBlog.mock.calls[0][0].author).toBe('John H. Watson')
    expect(addBlog.mock.calls[0][0].url).toBe('b221.co.uk')
})
