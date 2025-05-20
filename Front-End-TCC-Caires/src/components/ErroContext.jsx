import { createContext, useState, useContext } from 'react';

const ErrorContext = createContext();

export const ErrorProvider = ({ children }) => {
    const [errorMessage, setErrorMessage] = useState('');

    const setError = (message) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(''), 8); // Remove erro após 5s
    };

    return (
        <ErrorContext.Provider value={{ errorMessage, setError }}>
            {children}
        </ErrorContext.Provider>
    );
};

export const useError = () => useContext(ErrorContext);
