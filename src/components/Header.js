import React from 'react';
import "./Header.css";
import { Avatar } from "@material-ui/core";
import { useSelector } from "react-redux";

function Header() {
    const user = useSelector(state=>state);
    return (
        <div className="header">
            <h1 className="header__title">Popat</h1>
            <Avatar className="header__avatar" src={user.userPhotoUrl}/>
        </div>
        )
    }

export default Header
