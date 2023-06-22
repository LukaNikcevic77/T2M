import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function SearchBarField(props){

    const {getCurrentUserImage} = useContext(SignInUpContext);
    const {userId, userName} = props;
    
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        getCurrentUserImage(userId, setUserImg)
    }, [])
    return <div className="searchBarField smallText">
                                <img src={userImg} alt="Image"/>
                                {userName}
                            </div>
}

export default SearchBarField