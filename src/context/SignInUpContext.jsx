import React, { createContext } from 'react';
import { useState, useEffect } from "react";
import { db, storage } from '../firebaseconfig/firebase';
import { getDocs, collection, addDoc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export const SignInUpContext = createContext(null);

export const SignInUpContextProvider = (props) => {

    const [currentUserId, setCurrentUserId] = useState('');
    const [userImg, setUserImg] = useState(null);

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
    useEffect(() => {
        if(currentUserId != null){
            getCurrentUserImage(currentUserId);
        }
    }, [currentUserId])

    const checkUserName = (username) => {
        return filterProfiles.some((userProfile) => userProfile.userName === username);
    }

    const addNewProfile = async(user, username) => {
        await addDoc(profileListRef, {
            userId: user,
            userName: username
        })
    }

    const getCurrentUserImage = async(a) => {
        const profileImg = ref(storage, `profileImages/${a}`);
        getDownloadURL(profileImg).then((url) => {setUserImg(url)});
    }
    const getUserName = (a) => {
        const foundProfile = filterProfiles.find((profile) => {
            if (profile.userId === a) {
              return profile.userName;
            }
          });
          
          if (foundProfile) {
            return foundProfile.userName;
          }
    }

    const contextValue = {currentUserId, setCurrentUserId, checkUserName, addNewProfile, userImg, getUserName, filterProfiles};

    return <SignInUpContext.Provider value={contextValue}>
        {props.children}
    </SignInUpContext.Provider>
} 

