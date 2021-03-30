import React from 'react'
import PropTypes from 'prop-types'

const AddBlog = ({
   handleSubmit,
   handleTitleChange,
   handleAuthorChange,
   handleUrlChange,
   title,
   url,
   author
  }) => {
  return (
    <div>
      <h2>Add new blog</h2>

      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

AddBlog.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    handleAuthorChange: PropTypes.func.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
}

export default AddBlog