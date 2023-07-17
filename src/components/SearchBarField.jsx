import React, { useEffect, useState, useContext } from 'react';
import { SignInUpContext } from '../context/SignInUpContext';

function SearchBarField(props) {
  const {
    getCurrentUserImage,
    addChatRoom,
    changeProfileTalkingTo,
    getUserName,
    getUsers,
  } = useContext(SignInUpContext);
  const { userId, userName } = props;

  const [userImg, setUserImg] = useState(null);

  useEffect(() => {
    getCurrentUserImage(userId, setUserImg);
  }, [userId]);

  if (props.isMobile) {
    return (
      <div
        className="searchBarField smallText"
        onClick={() => {
          addChatRoom(userId),
            changeProfileTalkingTo(getUserName(userId), userImg, userId),
            props.setShowChat(true),
            getUsers();
        }}
      >
        <img src={userImg} alt="Image" />
        {userName}
      </div>
    );
  } else {
    return (
      <div
        className="searchBarField smallText"
        onClick={() => {
          addChatRoom(userId),
            changeProfileTalkingTo(getUserName(userId), userImg, userId),
            getUsers();
        }}
      >
        <img src={userImg} alt="Image" />
        {userName}
      </div>
    );
  }
}

export default SearchBarField;
