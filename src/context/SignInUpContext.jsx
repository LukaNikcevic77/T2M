import React, { createContext } from 'react';
import { useState, useEffect } from "react";
import { db, storage } from '../firebaseconfig/firebase';
import { getDocs, collection, addDoc, getDoc, doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

export const SignInUpContext = createContext(null);

export const SignInUpContextProvider = (props) => {

    const [currentUserId, setCurrentUserId] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [profileTalkingTo, setProfileTalkingTo] = useState({
        profileName: '',
        profileImage: ''
    });
    const [userImg, setUserImg] = useState(null);

    const profileListRef = collection(db, "Profiles");
    const [filterProfiles, setFilterProfiles] = useState(null);
    
    const getUsers = async() => {
        const profiles = await getDocs(profileListRef);
        const filteredProfiles = profiles.docs.map((user) => ({...user.data(), profileId: user.id}))
        setFilterProfiles(filteredProfiles);
        
    }
    const addChatRoom = (a) => {

        filterProfiles.map((profile) => {

            if(profile.userId === currentUserId){

                if(profile.Chats.some(chat => chat.TalkingTo === a)){
                    console.log("Reutrned");
                    return
                }
                else {
                    const profileDocRef = doc(db, "Profiles", profile.profileId);
                    
                    updateDoc(profileDocRef, {
                        Chats: arrayUnion({TalkingTo: a, Messages: {}})
                    })
                    
                    filterProfiles.map((profileB) => {
                        console.log("DADADA" + profileB);
                        if(profileB.userId === a){
                            const profileDocRef = doc(db, "Profiles", profileB.profileId);
                    
                            updateDoc(profileDocRef, {
                                Chats: arrayUnion({TalkingTo: currentUserId, Messages: {}})
                            })
                        }
                    })
                }
            }
        })
        

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
            userName: username,
            Chats: [{}]
        })
    }

    const getCurrentUserImage = async(a, b) => {
        if(a === currentUserId) {
            const profileImg = ref(storage, `profileImages/${a}`);
            await getDownloadURL(profileImg).then((url) => {setUserImg(url)});
        }
        else {
            const profileImg = ref(storage, `profileImages/${a}`);
            await getDownloadURL(profileImg).then((url) => {b(url)});
        }
        
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

    const changeProfileTalkingTo = (a, b) => {
        setProfileTalkingTo({profileName: a,
            profileImage: b})
            console.log(profileTalkingTo)
    }

    const contextValue = {currentUserId, setCurrentUserId, checkUserName, addNewProfile, 
        userImg, getUserName, filterProfiles, 
        getCurrentUserImage, currentUserName, setCurrentUserName,
        addChatRoom, profileTalkingTo, setProfileTalkingTo,
        changeProfileTalkingTo};

    return <SignInUpContext.Provider value={contextValue}>
        {props.children}
    </SignInUpContext.Provider>
} 

