import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

export const Context =createContext({})
const AppWrapper = () => {

    const [id,setId]=useState("")
    return (
        <Context.Provider value={{
            id,setId
        }}>
            <App />
        </Context.Provider>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
        <AppWrapper />
    
);
