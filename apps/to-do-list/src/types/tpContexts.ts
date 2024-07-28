import { UserCredential } from "firebase/auth";
import { itUser } from "../interfaces/itUser";

// eslint-disable-next-line @typescript-eslint/ban-types
type  tpGlobalContextStatus =  "Loading" | "Online" 


type tpGlobalContext = {
    signUp: (user: itUser) => Promise<UserCredential>;
    signIn: (user: itUser) => Promise<UserCredential>
    saveCredentials: (userCredential: UserCredential) => void;  
    clearCredentials: () => void;
    appStatus: tpGlobalContextStatus;
    setGlobalStatus: (status: tpGlobalContextStatus) => void;
}







export type {
    tpGlobalContext, 
    tpGlobalContextStatus
}