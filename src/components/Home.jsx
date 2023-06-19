import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";
function Home() {   
    
    const {currentUserId, userImg, getUserName} = useContext(SignInUpContext);
    const isPc = window.matchMedia('(min-width: 1024px').matches;
    const [userName, setUserName] = useState(null);
    useEffect(() => {
        setUserName(getUserName(currentUserId));
        console.log(getUserName(currentUserId));
        console.log(userName);
    },[]);
    return(
        <>
        {!isPc &&
    <>
    <div className='mobile-navbar mobile-navbar-text-big'>
    
    </div>
    </>}
        <div className="parentGrid">
            {isPc && 
            <>
            <div className="contactsDiv grid-item-25">
                <div className="profiles">
                    <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                <div className="chatDetails"></div>

                <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                <div className="chatDetails"></div>
                </div>
                <div className="myProfile">
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{userName}</p>
                </div>
            </div>
            <div className="chatGrid">
                
            </div>
            </>}
        </div>
        <h1>Here I am {currentUserId}!</h1>;
        </>
    )

}

export default Home