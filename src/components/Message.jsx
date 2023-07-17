import React, { useEffect, useState, useContext } from 'react';
import { SignInUpContext } from '../context/SignInUpContext';

function Message() {
  const { currentMessages, currentUserId, scrollIntoView } =
    useContext(SignInUpContext);

  const [userImg, setUserImg] = useState(null);

  return (
    <>
      {currentMessages != null && (
        <>
          {currentMessages.map((chat) => {
            if (chat.Sender === currentUserId) {
              scrollIntoView();
              return (
                <>
                  <span className="messageright">
                    <p className="messageContenttext">{chat.Content}</p>
                    <span className="messageTime" style={{ float: 'right' }}>
                      {chat.time}
                    </span>
                  </span>
                </>
              );
            } else {
              scrollIntoView();
              return (
                <>
                  <span className="messageleft">
                    <p className="messageContenttext">{chat.Content}</p>
                    <span className="messageTime" style={{ float: 'right' }}>
                      {chat.time}
                    </span>
                  </span>
                </>
              );
            }
          })}
        </>
      )}
    </>
  );
}

export default Message;
