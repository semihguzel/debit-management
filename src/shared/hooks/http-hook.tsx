import {useCallback, useEffect, useRef, useState} from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const activeHttpRequests = useRef<AbortController[]>([]);

    const sendRequest = useCallback(async (url: string, method: string, body: string | null, headers: {}) => {
        setIsLoading(true);

        const httpAbortController = new AbortController();
        activeHttpRequests.current.push(httpAbortController);

        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortController.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(
                (reqCtrl) => reqCtrl !== httpAbortController
            );

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            setIsLoading(false);
            return responseData;
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
            throw err;
        }
    }, [])

    const clearError = () => {
        setError(null);
    }

    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
        }
    }, []);

    return {
        isLoading,
        error,
        sendRequest,
        clearError
    };
};