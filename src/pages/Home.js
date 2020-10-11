import React from 'react';
import "./Home.css";
import Header from "../components/Header";
import PostCreator from "../components/PostCreator";
import Posts from "../components/Posts";

function Home() {
    return (
        <div className="home">
            <div className="home__top">
                <Header />
            </div>
            <div className="home__bottom">
                <PostCreator />
                <Posts />
            </div>
        </div>
    )
}

export default Home
