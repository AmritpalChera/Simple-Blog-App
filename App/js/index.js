

const API_URL = "http://localhost:3000/api/posts";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPosts();
}

const getPosts = () => {
    let posts = fetch(API_URL, {method: 'GET'});
    posts.then((response)=>{
        return response.json();
    })
    .then((data)=>{
        buildPosts(data);
    })
}

const buildPosts = (blogPosts) => {
    let blogPostContent ="";
    for (let post of blogPosts){
        const postDate = new Date(parseInt(post.added_date)).toDateString(); //converts to date string
        const postImage = `${API_BASE_URL}${post.post_image}`;
        const postLink = `/post.html?id=${post.id}`;
        blogPostContent+=`
        <a class="post-link" href="${postLink}">
            <div class="post">
                <div class = "post-image" style="background-image: url(${postImage});"></div>
                <div class = "post-content">
                    <div class="post-content-date">${postDate}</div>
                    <div class="post-content-title">${post.title}</div>
                    <div class="post-content-text">${post.content}</div>
                </div>
                
            </div>
        </a>
        `
    }

    document.querySelector('.blog-posts').innerHTML = blogPostContent;
}