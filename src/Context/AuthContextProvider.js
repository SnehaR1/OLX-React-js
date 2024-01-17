import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore'


const AuthContext = createContext()


export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})
    function signUp(email, password, username, phone) {
        createUserWithEmailAndPassword(auth, email, password)
        const userUID = auth.currentUser.uid;
        setDoc(doc(db, 'users', email), {
            id: userUID,
            username: username,
            phone: phone,

        })

    }
    function logIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logOut() {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    })

    return (
        <AuthContext.Provider value={{ signUp, logIn, logOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth() {
    return useContext(AuthContext)
}