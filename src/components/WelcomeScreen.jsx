import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGhost } from '@fortawesome/free-solid-svg-icons'


function WelcomeScreen(){
    return (
        <>
            <div className="bigHolder">
                <div className="signInContainer">
                   <span className="welcomeLabel">
                    <FontAwesomeIcon icon={faGhost} className='logo'/>
                    <h1 className='bigText title'>Welcome</h1>
                    <p className='smallText'>Phone Sign-in to continue</p>
                    </span>     
                </div>
            </div>
        </>
    )

}
export default WelcomeScreen;