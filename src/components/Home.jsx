import React, { useEffect, useRef } from "react";
import { useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faGear, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchBarField from "./SearchBarField";
import ChatDetails from './ChatDetails';
import Message from "./Message";

function Home() {   
    
    const {currentUserId, userImg, getUserName, filterProfiles, 
        currentUserName, setCurrentUserName,
        profileTalkingTo, sendMessage, getUsers,
    messagesContaienrRef, scrollIntoView} = useContext(SignInUpContext);
    const isPc = window.matchMedia('(min-width: 1024px').matches;
    const [showChat, setShowChat] = useState(false);
    const [userName, setUserName] = useState(null);
    const [messageText, setMessageText] = useState('');
    const[searchValue, setSearchValue] = useState("");

    useEffect(() => {if(showChat) scrollIntoView()}, [showChat])

    useEffect(() => {
        if(currentUserName === ''){
         const a = getUserName(currentUserId);
            setCurrentUserName(a);
        }
        getUsers();
    },[]);
    useEffect(() => {
        
        scrollIntoView();
        
    }, [messagesContaienrRef])
    return(
        <>
        {!isPc &&
    <>
    
    
    
    </>}
        <div className="parentGrid">
            {isPc && 
            <>
            <div className="contactsDiv grid-item-25">
                <input
                 type="text"
                className="searchBar smallText"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}}
                />
                {filterProfiles != null && 
                    <div className="searchedProfilesHolder">
                        {filterProfiles
                        .filter((profile) => {

                            if(profile.userName != undefined){

                                const searchProfile = searchValue.toLowerCase();
                                const usertag = profile.userName.toLowerCase();
                                if(searchProfile !== "" && usertag.startsWith(searchProfile)){
                                    if(profile.userId !== currentUserId) {
                                        return profile;
                                    }
                                    
                                }
                            }
                        })
                        .map((correctProfile) => {
                           
                            return <SearchBarField userId = {correctProfile.userId} userName = {correctProfile.userName} />
                        })
                        }
                    </div>
                }
                <div className="profiles">
                    <ChatDetails />
                </div>
                <div className="myProfile">
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{currentUserName}</p>
                </div>
            </div>
            <div className="chatGrid">
            <div className="profileITalkTo">
               
            <img src={profileTalkingTo.profileImage} alt="" className="userImage"/>
                <p className="mediumSmallText">{profileTalkingTo.profileName}</p>
                </div>
                <div className="messagesContainer">
                    <p className="smallText message">Lorem ipsum dolor <br />sit amet consectetur adipisicing elit. Tenetur doloremque excepturi <br /> sit quam reprehenderit distinctio ipsa. Corrupti laboriosam quia quam!</p>
                    <p className="smallText message">Lorem ipsum dolor <br />sit amet consectetur adipisicing elit. Tenetur doloremque excepturi <br /> sit quam reprehenderit distinctio ipsa. Corrupti laboriosam quia quam!</p>
               
                <Message/>
                <div className="scrollToDiv"  ref={messagesContaienrRef}></div>
                </div>
                <div className="messageSending">
                <textarea type="text" name="" id="" className="messageInput smallText"
                onChange={(e) => setMessageText(e.target.value)}/>
                <button className="btn-sendMessage"
                onClick={() => {sendMessage(
                    {
                        Content: messageText,
                        Sender: currentUserId,
                }, {
                    Content: messageText,
                    Sender: currentUserId,
            })
            scrollIntoView()
        }
            }>
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
                        <input
                 type="text"
                className="searchBar smallText"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {setSearchValue(e.target.value)}}
                />
                {filterProfiles != null && 
                    <div className="searchedProfilesHolder">
                        {filterProfiles
                        .filter((profile) => {

                            if(profile.userName != undefined){

                                const searchProfile = searchValue.toLowerCase();
                                const usertag = profile.userName.toLowerCase();
                                if(searchProfile !== "" && usertag.startsWith(searchProfile)){
                                    if(profile.userId !== currentUserId) {
                                        return profile;
                                    }
                                    
                                }
                            }
                        })
                        .map((correctProfile) => {
        
                            return <SearchBarField userId = {correctProfile.userId} userName = {correctProfile.userName} isMobile={true} setShowChat={setShowChat}/>
                        })
                        }
                    </div>
                }
                <div className="profiles">
                    <ChatDetails showChat={true} setShowChat={setShowChat}/>
                
                   </div>
                <div className="myProfile">
                <img src={userImg} alt="" className="userImage"/>
                <p className="mediumSmallText">{currentUserName}</p>
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
                <img src={profileTalkingTo.profileImage} alt="" className="userImage"/>
                <p className="mediumSmallText">{profileTalkingTo.profileName}</p>
                </div>
                <div className="messagesContainer">
                   
                <Message/>
                <div className="scrollToDiv"  ref={messagesContaienrRef}></div>
                </div>
                <div className="messageSending">
                <textarea type="text" name="" id="" className="messageInput smallText"
                onChange={(e) => setMessageText(e.target.value)}/>
                <button className="btn-sendMessage"
                onClick={() => {sendMessage(
                    {
                        Content: messageText,
                        Sender: currentUserId,
                }, {
                    Content: messageText,
                    Sender: currentUserId,
            })
            scrollIntoView()
        }
            }>
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