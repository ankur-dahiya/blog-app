import axios from "axios";
import authContext from "./authContext";
import { useEffect, useState } from "react";

export const AuthContextProvider = (props)=>{
    const [currentUser,setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs)=>{
        const res = await fetch("/auth/login",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(inputs)
        });
        const data = await res.json();
        setCurrentUser(data);
    }

    const logout = async (inputs)=>{
        const res = axios.post("/auth/logout");
        setCurrentUser(null);
    }

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(currentUser));
    },[currentUser])
    return (
        <authContext.Provider value={{currentUser,login,logout}}>{props.children}</authContext.Provider>
    )
}
