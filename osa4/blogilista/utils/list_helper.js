// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((previous, blog) => previous + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) return null
    return blogs.reduce((previous, blog) => (previous.likes<blog.likes)?blog:previous, blogs[0])
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return null
    const authorBlogCount = blogs.reduce(
        (previous, blog) => {
            const result = { ...previous }
            result[blog.author] = (previous[blog.author] || 0) + 1
            return result
        }, {}
    )
    const authorWithMostBlogs = Object.keys(authorBlogCount).reduce(
        (previous, author) => (authorBlogCount[previous]<authorBlogCount[author])?author:previous, blogs[0].author
    )
    return {
        author: authorWithMostBlogs,
        blogs: authorBlogCount[authorWithMostBlogs]
    }
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return null
    const authorLikeCount = blogs.reduce(
        (previous, blog) => {
            const result = { ...previous }
            result[blog.author] = (previous[blog.author] || 0) + blog.likes
            return result
        }, {}
    )
    const authorWithMostLikes = Object.keys(authorLikeCount).reduce(
        (previous, author) => (authorLikeCount[previous]<authorLikeCount[author])?author:previous, blogs[0].author
    )
    return {
        author: authorWithMostLikes,
        blogs: authorLikeCount[authorWithMostLikes]
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}