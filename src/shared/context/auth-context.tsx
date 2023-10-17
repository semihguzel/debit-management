import {createContext} from "react";

export interface IAuthContext {
    isLoggedIn: boolean,
    userId: string | null,
    token: string | null,
    login: (uid: string, token: string, expirationDate: Date | null) => void,
    logout: () => void,
}

export const AuthContext = createContext<IAuthContext>({
    isLoggedIn: false,
    userId: null,
    token: null,
    login: () => {
    },
    logout: () => {
    }
});