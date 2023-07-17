import React, { createContext } from 'react';
import { useState, useEffect, useRef } from "react";
import { db, storage } from '../firebaseconfig/firebase';
import { getDocs, collection, addDoc,
     getDoc, doc, arrayUnion, updateDoc,
    onSnapshot, query, where } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import _isEqual from 'lodash/isEqual'

export const SignInUpContext = createContext(null);

export const SignInUpContextProvider = (props) => {

    const [currentTime, setCurrentTime] = useState(null);
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentUserDocId, setCurrentUserDocId] = useState('');
    const [currentUserName, setCurrentUserName] = useState('');
    const [profileTalkingTo, setProfileTalkingTo] = useState({
        profileName: '',
        profileImage: '',
        profileId: '',
        profileDocId: ''
    });
useEffect(() => {console.log(profileTalkingTo)}, [profileTalkingTo])
    const messagesContaienrRef = useRef(null);

    const [currentMessages, setCurrentMessages] = useState(null);

    const [userImg, setUserImg] = useState(null);

    const profileListRef = collection(db, "Profiles");
    const [filterProfiles, setFilterProfiles] = useState(null);
    
    const scrollIntoView = () => {
        if(messagesContaienrRef.current != null){

            messagesContaienrRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }

    const getUsers = async() => {
        const profiles = await getDocs(profileListRef);
        const filteredProfiles = profiles.docs.map((user) => ({...user.data(), profileId: user.id}))
        setFilterProfiles(filteredProfiles);
        filteredProfiles.map((profileId) => {if(profileId.userId === currentUserId) {setCurrentUserDocId(profileId.profileId)}}) 
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
                        Chats: arrayUnion({TalkingTo: a, Messages: []})
                    })
                    
                    filterProfiles.map((profileB) => {
                        console.log("DADADA" + profileB);
                        if(profileB.userId === a){
                            const profileDocRef = doc(db, "Profiles", profileB.profileId);
                    
                            updateDoc(profileDocRef, {
                                Chats: arrayUnion({TalkingTo: currentUserId, Messages: []})
                            })
                        }
                    })
                }
            }
        })
        

    }
    const sendMessage = async(a, b) => {
       
       filterProfiles.find((profile) => {
            if (profile.userId === profileTalkingTo.profileId) {
              profileTalkingTo.profileDocId = profile.profileId
              console.log("Kurac");
            }
          });
        
        console.log(currentUserDocId);
        const userProfileDocRef = doc(db, "Profiles", currentUserDocId);
        const userProfile = (await getDoc(userProfileDocRef)).data();
        const endUserDocRef = doc(db, "Profiles", profileTalkingTo.profileDocId);
        const endUserProfile = (await getDoc(endUserDocRef)).data();
            const now = new Date();
            const formattedDateTime = now.toLocaleString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hourCycle: 'h23'
            });
            setCurrentTime(formattedDateTime);
            a.time = formattedDateTime;
            b.time = formattedDateTime;

            console.log(userProfile);
            console.log(endUserProfile);
           
            userProfile.Chats.map((chat) => {
                if (chat.TalkingTo === profileTalkingTo.profileId) {
                  
                  chat.Messages.push(a);
              
                  const chatRef = doc(db, "Profiles", currentUserDocId);
                  updateDoc(chatRef, {
                    Chats: userProfile.Chats
                  });
                }
              });
              
              endUserProfile.Chats.map((chat) => {
                if (chat.TalkingTo === currentUserId) {
                  
                  chat.Messages.push(b);
              
                  const chatRef = doc(db, "Profiles", profileTalkingTo.profileDocId);
                  updateDoc(chatRef, {
                    Chats: endUserProfile.Chats
                  });
                }
              });
              
             

        
    }
    const currentUserChats = query(profileListRef, where("userId", "==", currentUserId));

    onSnapshot(currentUserChats, (snapshot) => {
        let profileDataArray = [];
        snapshot.docs.map((doc) => profileDataArray.push({...doc.data()}));
       if(profileDataArray.length !== 0){
        
           const chats = profileDataArray[0].Chats;
           const nededChat = chats.find((chat) => chat.TalkingTo === profileTalkingTo.profileId);
           console.log('nededChat:', chats, "currentMessages:", currentMessages, "profile:", profileTalkingTo);
           if(currentMessages != null && currentMessages.length != nededChat.Messages.length){
            setCurrentMessages(nededChat.Messages);
           }
           else if(currentMessages != null && currentMessages.length === nededChat.Messages.length) {
            if(!_isEqual(currentMessages, nededChat.Messages)){

                setCurrentMessages(nededChat.Messages);
            }
           }
           else if(currentMessages == null && nededChat != undefined){
            setCurrentMessages(nededChat.Messages);
        
           }
       }


        
    })
    useEffect(() => {
            getUsers();
    }, [])
    
    useEffect(() => {
        if(currentUserId !== ''){
            
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
            const profileImg = ref(storage, `/profileImages/${a}`);
            await getDownloadURL(profileImg).then((url) => {setUserImg(url)});
        }
        else if(a != undefined){
            const profileImg = ref(storage, `/profileImages/${a}`);
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

    

    const changeProfileTalkingTo = (a, b, c) => {
        setProfileTalkingTo({profileName: a,
            profileImage: b,
            profileId: c})
            console.log(profileTalkingTo)
    }

    const contextValue = {currentUserId, setCurrentUserId, checkUserName, addNewProfile, 
        userImg, getUserName, filterProfiles, getUsers,
        getCurrentUserImage, currentUserName, setCurrentUserName,
        addChatRoom, profileTalkingTo, setProfileTalkingTo,
        changeProfileTalkingTo, sendMessage, currentMessages,
        messagesContaienrRef, scrollIntoView};

    return <SignInUpContext.Provider value={contextValue}>
        {props.children}
    </SignInUpContext.Provider>
} 

