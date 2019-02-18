const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totallikes = 0
    blogs.forEach(blog => {
        totallikes += blog.likes
    });
    return totallikes
}

module.exports = {
    dummy, 
    totalLikes
}