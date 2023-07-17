import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function ChatCard(props){

    const {getCurrentUserImage, filterProfiles, getUserName, 
        currentUserId, changeProfileTalkingTo, scrollIntoView} = useContext(SignInUpContext);
    
    const [userImg, setUserImg] = useState(null);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        getCurrentUserImage(props.profile.TalkingTo, setUserImg);
        setUserName(getUserName(props.profile.TalkingTo));
    }, [])
   
    
                    
                    if(Object.keys(props.profile).length === 0){

                    }
                    else {
                        if(props.showChat){
                            return (<div className="chatDetails"
                            onClick={() => 
                            {changeProfileTalkingTo(userName, userImg, props.profile.TalkingTo),
                            props.setShowChat(true), scrollIntoView()}}>
                                <span>
                                <img src={userImg} alt="" className="chatsImage" />
                            <h1>{userName}</h1>
    
                            </span>
        
                        </div>)
                        }
                        else {
                            
                            return (<div className="chatDetails"
                            onClick={() => {changeProfileTalkingTo(userName, userImg, props.profile.TalkingTo),
                            scrollIntoView()}}>
                                <span>
                                <img src={userImg} alt="" className="chatsImage" />
                            <h1>{userName}</h1>
                            </span>
        
                        </div>)
                        }
                    }
                    
                    
                }
         
        
    
    
    


export default ChatCard