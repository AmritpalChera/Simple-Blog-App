const PATH = "./data.json"
const fs = require('fs');

class Post{

    get(){
        /**Get Posts */
        return this.readData();
    }
    getIndividualBlog(id){
        /**Get one blog post */
        let currentPosts = this.readData();
        for (let post of currentPosts){
            if (post.id == id) return post;
        }

    }
    add(newPost){
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }

    readData(){
        let rawData = fs.readFileSync(PATH);
        let posts = JSON.parse(rawData);
        return posts;
    }

    storeData(rawData){
        let data = JSON.stringify(rawData, null, 2);
        fs.writeFileSync(PATH, data);
    }
}

module.exports = Post;