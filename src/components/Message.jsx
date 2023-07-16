import React, { useEffect, useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";


function Message(){

    const {currentMessages, currentUserId, scrollIntoView} = useContext(SignInUpContext);
    
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
                  scrollIntoView();
                  return (
                    <p className="smallText messageright">
                      {chat.Content}
                      <p className="smallText" style={{float: 'right'}}>{chat.time}</p>
                    </p>
                  );
                  
                } else {
                  scrollIntoView();
                  return (
                    <p className="smallText messageleft">
                      {chat.Content}
                      <p className="smallText" style={{float: 'right'}}>{chat.time} </p>
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