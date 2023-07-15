import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function Message(){

    const {currentMessages, currentUserId} = useContext(SignInUpContext);
    
    const [userImg, setUserImg] = useState(null);

    useEffect(() => {
        console.log(currentMessages);
       
    }, [currentMessages])
    
    
   
    return (
        <>
          {currentMessages != null && (
            <>
              {currentMessages.map((chat) => {


                if (chat.Sender === currentUserId) {
                  return (
                    <p className="smallText messageright">
                      {chat.Content}
                      <p className="smallText">{chat.Sender}</p>
                    </p>
                  );
                } else {
                  return (
                    <p className="smallText messageleft">
                      {chat.Content}
                      <p className="smallText">{chat.Sender}</p>
                    </p>
                  );
                }
              })}
            </>
          )}
        </>
      );
       
}

export default Message;