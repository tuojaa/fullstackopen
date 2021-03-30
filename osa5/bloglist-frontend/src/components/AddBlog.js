import React, { useState } from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({ doAddBlog }) => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
  
    const handleSubmit = (event) => {
        event.preventDefault()        
        doAddBlog({ author, title, url }).then(() => {
            setAuthor('')
            setTitle('')
            setUrl('')    
        })
    }

    return (
        <div>
        <h2>Add new blog</h2>

        <form onSubmit={handleSubmit}>
            <div>
            title
            <input
                id="title"
                value={title}
                onChange={({ target }) => setTitle( target.value )}
            />
            </div>
            <div>
            author
            <input
                id="author"
                value={author}
                onChange={({ target }) => setAuthor( target.value )}
            />
            </div>
            <div>
            url
            <input
                id="url"
                value={url}
                onChange={({ target }) => setUrl( target.value )}
            />
            </div>
            <button 
                id="submit"
                type="submit">add</button>
        </form>
        </div>
    )
}

AddBlog.propTypes = {
    doAddBlog: PropTypes.func.isRequired    
}

export default AddBlog