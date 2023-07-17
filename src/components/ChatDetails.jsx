import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";
import ChatCard from "./ChatCard";

function ChatDetails(props){

    const {getCurrentUserImage, filterProfiles, getUserName, 
        currentUserId, changeProfileTalkingTo, scrollIntoView} = useContext(SignInUpContext);
    
    const [userImg, setUserImg] = useState(null);
    const [oldList, setOldList] = useState(null);
    
   
    useEffect(() => {setOldList(filterProfiles)}, [filterProfiles])
    
    return (
        <>
        {filterProfiles != null &&
            filterProfiles.map((profile) => {

              
            if(profile.userId === currentUserId) {
            
                return profile.Chats.map((ChatRoom) => {
                    return <ChatCard profile={ChatRoom} showChat={props.showChat} setShowChat={props.setShowChat}/> 
                    getCurrentUserImage(ChatRoom.TalkingTo, setUserImg)
                    const userName = getUserName(ChatRoom.TalkingTo);
                    if(Object.keys(ChatRoom).length === 0){
                        console.log("Object is empty");
                        console.log(ChatRoom);
                    }
                    else {
                        if(props.showChat){
                            console.log(userImg);
                            return (<div className="chatDetails"
                            onClick={() => 
                            {changeProfileTalkingTo(userName, userImg, ChatRoom.TalkingTo),
                            props.setShowChat(true), scrollIntoView()}}>
                                <span>
                                <img src={userImg} alt="" className="chatsImage" />
                            <h1>{userName}</h1>
    
                            </span>
        
                        </div>)
                        }
                        else {
                            console.log(userImg);
                            return (<div className="chatDetails"
                            onClick={() => {changeProfileTalkingTo(userName, userImg, ChatRoom.TalkingTo),
                            scrollIntoView()}}>
                                <span>
                                <img src={userImg} alt="" className="chatsImage" />
                            <h1>{userName}</h1>
                            </span>
        
                        </div>)
                        }
                    }
                    
                    
                })
            }
            
            /* return <div className="chatDetails">
                <h1>{getUserName(chat.TalkingTo)}</h1>
            </div> */
        })}
        </>
    
    )
}

export default ChatDetails