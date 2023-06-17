import React, { createContext } from 'react';
import { useState, useEffect } from "react";
import { db } from '../firebaseconfig/firebase';
import { getDocs, collection, addDoc, getDoc } from 'firebase/firestore';

export const SignInUpContext = createContext(null);

export const SignInUpContextProvider = (props) => {

    const [currentUserId, setCurrentUserId] = useState('');

    const profileListRef = collection(db, "Profiles");
    const [filterProfiles, setFilterProfiles] = useState(null);
    const getUsers = async() => {
        const profiles = await getDocs(profileListRef);
        const filteredProfiles = profiles.docs.map((user) => ({...user.data()}))
        setFilterProfiles(filteredProfiles);
        
    }
    useEffect(() => {
            getUsers();
    }, [])
    const checkUserName = (username) => {
        return filterProfiles.some((userProfile) => userProfile.userName === username);
    }

    const addNewProfile = async(user, username) => {
        await addDoc(profileListRef, {
            userId: user,
            userName: username
        })
    }

    const contextValue = {currentUserId, setCurrentUserId, checkUserName, addNewProfile};

    return <SignInUpContext.Provider value={contextValue}>
        {props.children}
    </SignInUpContext.Provider>
} 

