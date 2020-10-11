import React from 'react';
import "./Login.css";
import { auth, provider } from "../firebase";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { actionTypes } from '../reducers/userReducer';

function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                console.log(result);
                dispatch({
                    type: actionTypes.SET_USER,
                    payload: {
                        uid: result.user.uid,
                        username: result.user.displayName,
                        userPhotoUrl: result.user.photoURL
                    }
                })
                
            })
            .catch(error => console.log(error));
    };

    return (
        <div className="login">
            <h1 className="login__title">Welcome to Popat</h1>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    )
}

export default Login;
