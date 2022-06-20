import { MongoClient, ObjectId } from "mongodb"

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'blog';
const db = client.db(dbName);

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  // the following code examples can be pasted here...
}//start server
main()

async function insertUsers(){
  db.collection('users').insertOne({
    username: "Walter White",
    age: 56,
    posts: [],
    comments: [],
  },(error, result)=>{
    if(error){
      return console.log("cant insert user");
    }
    console.log(result);
  });
}

async function uploadPost(username, content){
  db.collection("posts").insertOne({
    uploader: username,
    content: content,
    comments: [],
  },(error, result)=>{
    if(error){
      return console.log("cant post");
    }
    console.log(result);
    addPostToUser(username, result.insertedId)
  })
}
// uploadPost("Walter White",":)")
async function addPostToUser(username,postID){ 
  db.collection('users').updateOne({username: username},{$push:{posts: postID}})
}

async function addComment(username, postID, content){
  db.collection('comments').insertOne({
    uploader: username,
    post: postID,
    content: content,
  },(error, result)=>{
    if(error){
      return console.log("cant insert user");
    }
    console.log(postID);
    console.log(result);
    addCommentToUser(username, result.insertedId)
    addCommentToPost(postID, result.insertedId)

  });
}
async function addCommentToUser(username,commentID){ 
  db.collection('users').updateOne({username: username},{$push:{comments: commentID}})
}
async function addCommentToPost(postID,commentID){ 
  db.collection('posts').updateOne({_id: postID},{$push:{comments: commentID}})
}
addComment("Walter White",new ObjectId("62b042b8f044502113b81f0f"),"nice post")