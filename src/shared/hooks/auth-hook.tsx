import {useCallback, useEffect, useState} from "react";

let logoutTimer: NodeJS.Timeout;

interface IUserData {
    token: string | null;
    userId: string | null;
    expiration: Date | null;
}

export const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);
    const [expirationDate, setExpirationDate] = useState<Date | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    const login = useCallback((uid: string, token: string, expirationDate: Date | null) => {
        setToken(token);
        setUserId(uid);

        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 3600);

        setExpirationDate(tokenExpirationDate);

        localStorage.setItem("userData", JSON.stringify({
            userId: uid, token, expiration: tokenExpirationDate.toISOString()
        }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setExpirationDate(null);
        setUserId(null);

        localStorage.removeItem("userData");
    }, [])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData')!) as IUserData;

        if (storedData && storedData.token && new Date(storedData.expiration!) > new Date()) {
            login(storedData.userId!, storedData.token, new Date(storedData.expiration!));
        }
    }, [login])

    useEffect(() => {
        if (token && expirationDate) {
            const remainingTime = expirationDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, expirationDate, logout]);

    return {token, login, logout, userId}
}

