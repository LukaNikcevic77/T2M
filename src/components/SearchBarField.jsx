import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function SearchBarField(props){

    const {getCurrentUserImage, addChatRoom, changeProfileTalkingTo, getUserName} = useContext(SignInUpContext);
    const {userId, userName} = props;
    
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        getCurrentUserImage(userId, setUserImg)
        
    }, [userId])

    
    
    return <div className="searchBarField smallText"
            onClick={() => {addChatRoom(userId), changeProfileTalkingTo(getUserName(userId), userImg)}}>
                                <img src={userImg} alt="Image"/>
                                {userName}
                            </div>
}

export default SearchBarField