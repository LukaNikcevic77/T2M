import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost, faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { auth, phoneProvider } from '../firebaseconfig/firebase';
import {signInWithPhoneNumber} from "firebase/auth"

function WelcomeScreen(){

    const [goFurther, setGoFurther] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState("");
    const [img, setImg] = useState(null);
    const [showCaseImg, setShowCaseImg] = useState(null);
    
    useEffect(() => {
        console.log({showSignIn, showSignUp, img})
    }, [showSignIn, showSignUp, img]);

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
            await signInWithPhoneNumber(auth, number);

            youAreWelcome("Home");
            
        } catch(err) {
            alert(err);
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
                        onChange={(e) => setMail(e.target.value)}
                      />
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className='btn-goFurther'>
                      <FontAwesomeIcon icon={faArrowRight} className='smallText'/>
                      </button>
                      <button className='goBackButton' onClick={() => {setGoFurther(false), setMail(""), setPassword(""), setShowSignIn(false)}}>
                      <FontAwesomeIcon icon={faArrowLeft} className='smallText'/>
                      </button>
                        </div>
                </>}
                {goFurther && showSignUp && <>
                    <div className='welcomeLabel' style={{marginTop: '15vh'}}>
                        <img src={showCaseImg} alt="" className='profileImage'/>
                    <input type="file" name="Image" id="" alt="Add image" accept="image/png, image/jpeg" className="smallText" 
                        onChange={(e) => {setImg(e.target.files[0]), makePreviewImage(e.target.files[0])}}/>
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
                        onChange={(e) => setMail(e.target.value)}
                      />
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
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button className='btn-goFurther'>
                      <FontAwesomeIcon icon={faArrowRight} className='smallText'/>
                      </button>
                      <button className='goBackButton' onClick={() => {setGoFurther(false), setMail(""), setPassword(""), setShowSignUp(false), setImg(null), setShowCaseImg(null)}}>
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