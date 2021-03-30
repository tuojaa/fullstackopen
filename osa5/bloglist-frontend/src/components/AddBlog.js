import React from 'react'

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

export default AddBlog