import React from "react";
import { useState, useContext } from "react";
import { SignInUpContext } from "../context/SignInUpContext";
function Home() {   
    const {currentUserId} = useContext(SignInUpContext);
    return(
        <>
        <h1>Here I am {currentUserId}!</h1>;
        </>
    )

}

export default Home