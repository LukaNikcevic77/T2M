import React, { createContext } from 'react';
import { useState, useEffect } from "react";

export const SignInUpContext = createContext(null);

export const SignInUpContextProvider = (props) => {

    const [currentUserId, setCurrentUserId] = useState('');

    const contextValue = {currentUserId, setCurrentUserId};

    return <SignInUpContext.Provider value={contextValue}>
        {props.children}
    </SignInUpContext.Provider>
} 

