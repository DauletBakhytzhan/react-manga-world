import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "@firebase/auth"
import { useState, useEffect, useMemo } from "react"
import { auth, db} from "./Firebase"


export const userAuth = ()=>{
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    
    useEffect(()=>{
        console.log()
        const unsub = onAuthStateChanged(auth, user => {
         if(user){   
            setLoggedIn(true)
            setUser(user)
          }
        else{
            setLoggedIn(false);
            setUser({})
        }  });
        
        return unsub;
    },[])
   

    const values = {user, isLoggedIn}
    return useMemo(() =>values, [values])
}