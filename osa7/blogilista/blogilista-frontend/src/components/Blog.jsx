import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
    const [blogVisible, setBlogVisible] = useState(false)

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 5,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
        maxWidth: 500,
    }

    const addLike = (event) => {
        event.preventDefault()
        updateLikes({
            ...blog,
            likes: blog.likes + 1,
            user: blog.user.id,
        })
    }

    const toggleVisibility = () => {
        setBlogVisible(!blogVisible)
    }

    return (
        <div style={blogStyle}>
            {!blogVisible && (
                <div>
                    <strong>{blog.title}</strong> by {blog.author}{' '}
                    <button onClick={toggleVisibility}>view</button>
                </div>
            )}
            {blogVisible && (
                <div>
                    <strong>{blog.title}</strong> by {blog.author}{' '}
                    <button onClick={toggleVisibility}>hide</button>
                    <br />
                    Url: {blog.url}
                    <br />
                    Likes: {blog.likes}{' '}
                    <button className="likeButton" onClick={addLike}>
                        like
                    </button>
                    <br />
                    Added by: {blog.user.name}
                    <br />
                    {user.username === blog.user.username && (
                        <button className="removeButton" onClick={removeBlog}>
                            delete
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

export default Blog
