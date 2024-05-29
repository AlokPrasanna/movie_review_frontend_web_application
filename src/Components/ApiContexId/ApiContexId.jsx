import React,{createContext,useContext,useState} from "react";

const ApiContextId = createContext();

const ApiContextIdProvider = ({children}) => {
    const [Id , setId] = useState();

    const setContextIdData = (newId) => {
        setId(newId);
    };

    return (<ApiContextId.Provider value={{Id,setContextIdData}} >{children}</ApiContextId.Provider>);
}

const useApiContextId = () => {
    return useContext(ApiContextId);
}

export {ApiContextIdProvider,useApiContextId}