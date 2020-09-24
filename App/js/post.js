

const API_URL = "http://localhost:3000/api/posts/";
const API_BASE_URL = "http://localhost:3000/";

window.onload = () => {
    getPost();
    
}

const getPostIdParam = ()=>{
    const queryString = window.location.search; //gives the full url
    const urlParams = new URLSearchParams(queryString);
    // console.log(urlParams);
    return urlParams.get("id");
}

const getPost = () => {
    const postId = getPostIdParam();
    const post = fetch(API_URL+postId, ({method: "GET"}))
    .then((response)=>{return response.json()})
    .then((data)=>buildPost(data))
    .catch((err)=>console.log(err));
}

const buildPost = (data) => {
    const date = new Date (parseInt(data.added_date)).toDateString();
    // console.log(date);
    //console.log(data);
    let post = `
    <div class = "post-content">
        <div id="individual-post-title">${data.title}</div>
        <div id="individual-post-date">Published on ${date} </div>
        <div id="individual-post-content">${data.content}</div>
    </div>
    `
    document.querySelector('header').style.backgroundImage = `url(${API_BASE_URL}${data.post_image})`
    document.getElementsByClassName('post-content')[0].innerHTML = post;
    
}
