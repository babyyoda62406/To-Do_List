import React, { FC, createContext, useState } from "react";

import { tpGlobalContext, tpGlobalContextStatus } from "../../types/tpContexts";
import { itUser } from "../../interfaces/itUser";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";


const defaultValues: tpGlobalContext = {
    signUp: () => {
        throw new Error('signUp no implementado')
    },
    signIn: () => {
        throw new Error('signIn no implementado')
    },
    saveCredentials: () => {
        throw new Error('saveCredentials no implementado')
    },
    clearCredentials: () => {
        throw new Error('clearCredentials no implementado')
    },
    appStatus: "Loading",
    setGlobalStatus: () => {
        throw new Error('setGlobalStatus no implementado')
    }
}

export const GlobalContext = createContext<tpGlobalContext>(defaultValues)


export const GlobalContextProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const signUp =  (user: itUser) =>  createUserWithEmailAndPassword(auth, user.email, user.password)
    const signIn = (user: itUser) => signInWithEmailAndPassword(auth, user.email, user.password)
    const saveCredentials = async (userCredential: UserCredential) => {
        sessionStorage.setItem('userCredentials', JSON.stringify(userCredential))
        sessionStorage.setItem('userToken', await userCredential.user.getIdToken())
    }
    const clearCredentials = () => {
        sessionStorage.removeItem('userCredentials')
        sessionStorage.removeItem('userToken')
    }

    const [appStatus, setAppStatus] = useState<tpGlobalContextStatus>("Loading")

    return <GlobalContext.Provider
        value={{
            signUp,
            signIn, 
            saveCredentials,
            clearCredentials, 
            appStatus,
            setGlobalStatus: (status: tpGlobalContextStatus) => setAppStatus(status)
        }}
    >
        {children}
    </GlobalContext.Provider>
}


