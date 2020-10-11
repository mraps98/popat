import React, { useState } from 'react';
import "./PostCreator.css";
import { Avatar, Button, Input } from "@material-ui/core";
import db from "../firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";

function PostCreator() {
        const [input, setInput] = useState("");
        const currentUser = useSelector(state=>state);
        const handlePostButtonClicked = (e) => {
            e.preventDefault();
            db.collection("posts").add({ username: currentUser.username, userPhotoUrl: currentUser.userPhotoUrl, text: input, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
            setInput("");
        };

        return (
            <div className="postCreator">
                <form>
                    <Avatar src={currentUser.userPhotoUrl}/>
                    <Input placeholder="Express yourself" value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={!input} type="submit" onClick={handlePostButtonClicked}>Post</Button>
                </form>
            </div>
        )
    }

export default PostCreator
