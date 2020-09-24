const express = require('express');
const app = express();
const Post = require('./api/models/posts');
const postData = new Post();

const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
    }
  });
const getExt = (mimeType)=>{
    switch(mimeType){
        case "image/png":
            return ".png";
        case "image/jpeg":
            return ".jpeg";
        case "image/jpg":
            return ".jpg";
    }
}

const upload = multer({storage: storage});


app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    // res.setHeader("Access-Control-Allow-Origin", "<origin>");
    // res.setHeader("Access-Control-Allow-Origin", "null");
    next();
})

app.use('/uploads', express.static('uploads'));

app.get("/", (req, res)=>{
    res.status(200).send("Hello World");
})


app.get("/api/posts/:post_id", (req, res)=>{
    const postId = req.params.post_id;
    const foundPost = postData.getIndividualBlog(postId);
    if (foundPost) res.status(200).send(foundPost);
    else res.status(404).send("Not Found");
})

app.get("/api/posts", (req, res)=>{
    res.status(200).send(postData.get());
});


app.post('/api/posts', upload.single("post_image"), (req, res)=>{
    // console.log(req.body);
    console.log(req.file);
    const filePath = `${req.file.destination}/${req.file.filename}`;
    console.log(filePath);
   const newPost = {
       "id" : `${Date.now()}`,
       "title" : req.body.title,
       "content" : req.body.content,
       "post_image" : filePath,
       "added_date": `${Date.now()}`
   }
   postData.add(newPost);
   res.status(201).send("ok")
   ;
});

app.listen(3000, ()=>console.log("Listening on port http://localhost:3000"));
