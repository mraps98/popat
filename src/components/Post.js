import React, {useState, useEffect} from 'react';
import "./Post.css";
import { Avatar, IconButton, Input, Modal, Button } from "@material-ui/core";
import { Favorite, FavoriteBorder, ChatBubbleOutline } from "@material-ui/icons";
import db from '../firebase';
import firebase from "firebase";
import {useSelector} from "react-redux";

function Post({ id, username, userPhotoUrl, text, timestamp }) {

    useEffect(()=>{
        db.collection("posts")
        .doc(id)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot(snapshot=>{
            setComments(snapshot.docs.map(doc=>doc.data()));
            setCommentsCount(snapshot.docs.length);
        });
    }, []);

    useEffect(()=>{
        db.collection("posts")
        .doc(id)
        .collection("likes")
        .doc(currentUser.uid)
        .onSnapshot(doc=>{
            if(doc.exists){
                setPostLiked(doc.data().liked)
            }
        })
    },[]);

    useEffect(()=>{
        db.collection("posts")
        .doc(id)
        .collection("likes")
        .onSnapshot(snapshot=>{
            let count = 0
            snapshot.docs.forEach(doc=>{
                console.log(doc.data().liked);
                if(doc.data().liked === true){
                    count++;
                }
            });
            setLikesCount(count);
        });
    },[])

    const currentUser = useSelector(state=>state);
    const [commentsModalOpen, setCommentsModalOpen] = useState(false);
    const [postLiked, setPostLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [likesCount, setLikesCount] = useState("");
    const [commentsCount, setCommentsCount] = useState("");
    
    const postComment = (e) => {
        e.preventDefault();
        db.collection("posts")
        .doc(id)
        .collection("comments")
        .add({
            userPhotoUrl: currentUser.userPhotoUrl,
            username: currentUser.username,
            text: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment("");
    };

    const handleLikeButtonClicked = (e) => {
        console.log("like clicked on post " + id);
        setPostLiked(!postLiked);

        if(!postLiked){
            db.collection("posts")
            .doc(id)
            .collection("likes")
            .doc(currentUser.uid)
            .set({
                liked: true,
            })
        }else{
            db.collection("posts")
            .doc(id)
            .collection("likes")
            .doc(currentUser.uid)
            .set({
                liked: false,
            })
        }
    }

    return (
        <>
        <div className="post">
            <div className="post__top">
                <div className="post__topLeft">
                    <Avatar src={userPhotoUrl} />
                    <p className="post__username">{username}</p>
                </div>
                <div className="post__topRight">
                    <p className="post__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</p>
                </div>
            </div>
            <div className="post__bottom">
                <p className="post__text">
                    {text}
                </p>
                <div className="post__options">
                    <IconButton onClick={handleLikeButtonClicked}>
                        <span className="post__likesCounter">{likesCount}</span>
                         {postLiked? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton onClick={()=>setCommentsModalOpen(true)}>
                        <span className="post__commentsCounter">{commentsCount}</span>
                        <ChatBubbleOutline />
                    </IconButton>
                </div>
            </div>
        </div>
        <Modal open={commentsModalOpen} onClose={()=>setCommentsModalOpen(false)} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className="post__comments">
                <div className="post__commentCreator">
                    <form>
                        <Input placeholder="Write a comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
                        <Button disabled={!comment} type="submit" onClick={postComment}>Post</Button>
                    </form>

                </div>
                <div className="post__commentsDisplay">
                    {
                        comments.length>0? (
                            <>
                            {comments.map(comment=>(
                                <div className="post__comment">
                                    <div className="post__commentAvatar">
                                        <Avatar src={comment.userPhotoUrl }/>
                                    </div>
                                    <div className="post__commentUsername">
                                        {comment.username}:
                                    </div>
                                    <div className="post__commentText">
                                        {comment.text}
                                    </div>
                                </div>
                                ))}
                            </>
                        ) : (
                            <center>No Comments</center>
                        )
                    }
                    
                </div>
            </div>
        </Modal>
        </>
    )
}

export default Post
