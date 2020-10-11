import React, {useState, useEffect} from 'react';
import "./Posts.css";
import Post from "./Post";
import db from "../firebase";


function Posts() {
    useEffect(()=>{
        db.collection("posts")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot=>{
            setPosts(snapshot.docs.map(doc=>({id: doc.id, data: doc.data()})));
            console.log(posts);
        })
    },[]);

    const [posts, setPosts] = useState([]);
    return (
        <div className="posts">
            {
                posts.map(post=><Post key={post.id} id={post.id} username={post.data.username} userPhotoUrl={post.data.userPhotoUrl} text={post.data.text} timestamp={post.data.timestamp} />)
            }
        </div>
    )
}

export default Posts
