import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth} from '../firebaseconfig/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { storage } from "../firebaseconfig/firebase";
import { ref, uploadBytes } from "firebase/storage";
import { faGhost, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { SignInUpContext } from '../context/SignInUpContext';

function WelcomeScreen(){

    const {setCurrentUserId, getUsers, 
      checkUserName, addNewProfile, 
      setCurrentUserName} = useContext(SignInUpContext);

    const [goFurther, setGoFurther] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [userName, setUserName] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(null);
    const [showCaseImg, setShowCaseImg] = useState(null);
    const [usernameUsed, setusernameUsed] = useState("none");
    const [accountDoesntExist, setAccountDoesntExist] = useState("none");
    const [passwordIsWrong, setPasswordIsWrong] = useState("none");
    const [imgIsntThere, setImgIsntThere] = useState("none");
    const isPc = window.matchMedia('(min-width: 1024px').matches;

    

    const navigate = useNavigate();

    
    const youAreWelcome = (a) => {
      
      
        navigate(a, {replace: true});
    }

    const makePreviewImage = (a) => {
        const reader = new FileReader();

      reader.onload = () => {

        setShowCaseImg(reader.result);

      };

      reader.readAsDataURL(a);

    }

    const signIn = async() => {

        try {
            await signInWithEmailAndPassword(auth, mail, password);
            setCurrentUserId(auth.currentUser.uid);
            
            youAreWelcome("Home");
            
        } catch(err) {
            console.log(err.code);
            if(err.code === "auth/user-not-found"){
              setAccountDoesntExist("");
            }
            else if(err.code === "auth/wrong-password"){
              setPasswordIsWrong("");
            }
        }

    }
    

    const signUpMail = async() => {
      try {
        if(img == null){
          setImgIsntThere("");
        }
        else if(userName === ''){
          setusernameUsed("");
          
        }
        else if(mail !== '' || password !== ''){
          if(!checkUserName(userName)) {
            await createUserWithEmailAndPassword(auth, mail, password);
            const profileImageRef = ref(storage, `/profileImages/${auth.currentUser.uid}`)
            uploadBytes(profileImageRef, img);
            await addNewProfile(auth.currentUser.uid, userName);
           await setCurrentUserId(auth.currentUser.uid);
           setCurrentUserName(userName);
            youAreWelcome("Home");
          }
          else {
            setusernameUsed("");
          }
          
          }
          
      }catch(err) {
        console.log(err.code);
        if(err.code === "auth/email-already-in-use" || err.code === "auth/invalid-email"){
          setAccountDoesntExist("");
        }
        else if(err.code === "auth/missing-password" || err.code === "auth/weak-password"){
          setPasswordIsWrong("");
        }
        
      }
    }

    return (
        <>
            <div className="bigHolder">
                <div className="signInContainer">
                    
                   <span className="welcomeLabel">
                   {!showSignUp && <>
                        <FontAwesomeIcon icon={faGhost} className='logo'/>
                    <h1 className='bigText title'>Welcome</h1>
                    <p className='smallText'>Phone Sign-in to continue</p>
                    </>}
                {!goFurther && <>
                
                   <button className="btn-2" onClick={() => {setGoFurther(true), setShowSignIn(true)}}>Sign in</button>
                   <button className="btn-1" onClick={() => {setGoFurther(true), setShowSignUp(true)}}>Sign up</button>
                </>}
                {goFurther && showSignIn && <>
                        <div className='welcomeLabel'>
                        <label htmlFor="emailInput" className="smallText">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="typingField"
                        value={mail}
                        onChange={(e) => {setMail(e.target.value), setAccountDoesntExist("none")}}
                        style={{border: accountDoesntExist !== "none"? '0.3vw solid red' : 'none'}}
                      />
                      <p className='smallText' style={{color: 'red', display: accountDoesntExist, fontWeight: '600'}}>*Account doesn't exist*</p>
                      <label htmlFor="passwordInput" className="smallText">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="typingField"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value), setPasswordIsWrong("none")}}
                        style={{border: passwordIsWrong !== "none"? '0.3vw solid red' : 'none'}}
                      />
                      <p className='smallText' style={{color: 'red', display: passwordIsWrong, fontWeight: '600'}}>*Password is wrong*</p>
                      <button className='btn-goFurther' onClick={() => signIn()}>
                      <FontAwesomeIcon icon={faArrowRight} className='smallText'/>
                      </button>
                      <button className='goBackButton' onClick={() => {setGoFurther(false), setMail(""), setPassword(""), setShowSignIn(false), setAccountDoesntExist("none"), setPasswordIsWrong("none")}}>
                      <FontAwesomeIcon icon={faArrowLeft} className='smallText'/>
                      </button>
                        </div>
                </>}
                {goFurther && showSignUp && <>
                    <div className='welcomeLabel' style={{marginTop: isPc? '-3vw' : '15vh'}}>
                        <img src={showCaseImg} alt="" className='profileImage'/>
                    <input type="file" name="Image" id="" alt="Add image" accept="image/png, image/jpeg" className="smallText" 
                        onChange={(e) => {setImg(e.target.files[0]), makePreviewImage(e.target.files[0]), setImgIsntThere("none")}}/>
                        <p className='smallText' style={{color: 'red', display: imgIsntThere, fontWeight: '600'}}>*You need a picture in order to use the app!*</p>
                      <label htmlFor="nameInput" className="smallText">
                        Username:
                      </label>
                      
                      <input
                        type="text"
                        name="nameInput"
                        id="nameInput"
                        placeholder="*UNCHANGABLE!*"
                        className="typingField"
                        maxLength={15}
                        value={userName}
                        style={{border: usernameUsed !== "none"? '0.3vw solid red' : 'none'}}
                        onChange={(e) => {setUserName(e.target.value), setusernameUsed("none")}}
                      />
                      <p className='smallText' style={{color: 'red', display: usernameUsed, fontWeight: '600'}}>*Username is allready in use!*</p>
                      
                        <label htmlFor="emailInput" className="smallText">
                        Email:
                      </label>
                      <input
                        type="email"
                        name="emailInput"
                        id="emailInput"
                        placeholder="Email..."
                        className="typingField"
                        value={mail}
                        style={{border: accountDoesntExist !== "none"? '0.3vw solid red' : 'none'}}
                        onChange={(e) => {setMail(e.target.value), setAccountDoesntExist("none")}}
                      />
                      <p className='smallText' style={{color: 'red', display: accountDoesntExist, fontWeight: '600'}}>*Email is allready in use!*</p>
                      <label htmlFor="passwordInput" className="smallText">
                        Password
                      </label>
                      <input
                        type="password"
                        name=""
                        id="passwordInput"
                        placeholder="Password..."
                        className="typingField"
                        value={password}
                        style={{border: passwordIsWrong !== "none"? '0.3vw solid red' : 'none'}}
                        onChange={(e) => {setPassword(e.target.value), setPasswordIsWrong("none")}}
                      />
                      <p className='smallText' style={{color: 'red', display: passwordIsWrong, fontWeight: '600'}}>*You need to add valid password*</p>
                      <button className='btn-goFurther' onClick={() => {signUpMail()}}>
                      <FontAwesomeIcon icon={faArrowRight} className='smallText'/>
                      </button>
                      <button className='goBackButton'
                       onClick={() => {setGoFurther(false), setMail(""), 
                       setPassword(""), setShowSignUp(false), setImg(null), 
                       setShowCaseImg(null), setAccountDoesntExist("none"), 
                       setPasswordIsWrong("none"), setImgIsntThere("none"),
                       setusernameUsed("none")}}>
                      <FontAwesomeIcon icon={faArrowLeft} className='smallText'/>
                      </button>
                        </div>
                </>}
                
                    </span>     
                </div>
            </div>
        </>
    )

}
export default WelcomeScreen;