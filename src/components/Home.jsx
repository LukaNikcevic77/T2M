import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
function Home() {   
    
    const {currentUserId, userImg, getUserName} = useContext(SignInUpContext);
    const isPc = window.matchMedia('(min-width: 1024px').matches;
    const [showChat, setShowChat] = useState(false);
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
            <div className="profileITalkTo">
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{userName}</p>
                </div>
                <div className="messageSending">
                <textarea type="text" name="" id="" className="messageInput smallText"/>
                <button className="btn-sendMessage">
                <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
            </div>
            
            </>}
            {!isPc && 
            <>
                {!showChat && 
                <>
                     <div className="contactsDiv grid-item-25">
                <div className="profiles">
                    <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>

                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                <div className="chatDetails" onClick={() => setShowChat(true)}></div>
                </div>
                <div className="myProfile">
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{userName}</p>
                <button className="btn-settings">
                    <FontAwesomeIcon icon={faGear} />
                </button>
                </div>
            </div>
                </>}
                {showChat && 
                <>
                <div className="chatGrid">
             <div className="profileITalkTo">
                <FontAwesomeIcon icon={faArrowLeft} className="goToChats" onClick={() => setShowChat(false)}/>
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{userName}</p>
                </div>
                <div className="messageSending">
                <textarea type="text" name="" id="" className="messageInput smallText"/>
                <button className="btn-sendMessage">
                <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
            </div>
                </>}
            </>}
        </div>
        </>
    )

}

export default Home