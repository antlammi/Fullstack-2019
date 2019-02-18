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
const favoriteBlog = (blogs) => {
    var favorite = blogs[0]
    var i;
    for (i=1; i<blogs.length; i++){
        if (blogs[i].likes > favorite.likes){
            favorite = blogs[i]
        }
    }
    return favorite
}


module.exports = {
    dummy, 
    totalLikes, 
    favoriteBlog
}