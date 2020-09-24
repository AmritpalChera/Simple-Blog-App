
const API_URL = "http://localhost:3000/api/posts";


//fetches data from the form, adds it to Formdata and then sends to api/posts
//redirects to homepage after 1s
const submitNewPost = () => {
    const title = document.getElementById('form-post-title').value ;
    const content = document.getElementById('form-post-content').value ;
    const input = document.getElementById("form-post-image");

    let data = new FormData ();
    data.append("post_image", input.files[0]);
    data.append("title", title);
    data.append("content", content);

    fetch(API_URL, ({method: "POST", body: data}))
    .then(()=>{
        //wait 1 second to ensure the API is able to properly submit data
        setTimeout(()=>{
            window.location.href = "index.html"
        }, 1000);
    });
}