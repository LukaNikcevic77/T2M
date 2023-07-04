import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function ChatDetails(props){

    const {getCurrentUserImage, filterProfiles, getUserName} = useContext(SignInUpContext);
    
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        
    }, [])
    
    
    return (
        <>
        {filterProfiles != null && 
            
            filterProfiles.map((profile) => {
                console.log(profile);
            if(profile.Chats.TalkingTo != undefined) {

                getCurrentUserImage(chat.TalkingTo, setUserImg)
            }
            console.log(profile.Chats)
            /* return <div className="chatDetails">
                <h1>{getUserName(chat.TalkingTo)}</h1>
            </div> */
        })}
        </>
    
    )
}

export default ChatDetails