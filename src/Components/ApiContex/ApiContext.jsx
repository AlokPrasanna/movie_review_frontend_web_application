import React, {createContext, useContext, useState} from "react";
const ApiContext = createContext();

const ApiContextProvider = ({children}) => {
    const [ApiUrl, setApiUrl] = useState();

    const setContextData = newData =>{
        setApiUrl(newData);
    };

    return (
        <ApiContext.Provider value={{ApiUrl, setContextData}}>{children}</ApiContext.Provider>
    );
};

const useApiContext =  () => {
    return useContext(ApiContext);
};

export {ApiContextProvider, useApiContext};