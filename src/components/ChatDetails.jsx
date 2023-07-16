import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function ChatDetails(props){

    const {getCurrentUserImage, filterProfiles, getUserName, 
        currentUserId, changeProfileTalkingTo, scrollIntoView} = useContext(SignInUpContext);
    
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        
    }, [])
    
    
    return (
        <>
        {filterProfiles != null && 
            
            filterProfiles.map((profile) => {

            if(profile.userId === currentUserId) {
                
                return profile.Chats.map((ChatRoom) => {
                    getCurrentUserImage(ChatRoom.TalkingTo, setUserImg)
                    const userName = getUserName(ChatRoom.TalkingTo);
                    
                    if(props.showChat){
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
                        return (<div className="chatDetails"
                        onClick={() => {changeProfileTalkingTo(userName, userImg, ChatRoom.TalkingTo),
                        scrollIntoView()}}>
                            <span>
                            <img src={userImg} alt="" className="chatsImage" />
                        <h1>{userName}</h1>
                        </span>
    
                    </div>)
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