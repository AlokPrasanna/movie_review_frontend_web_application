import React, {createContext, useContext, useState} from "react";
const ApiContextTitle = createContext();

const ApiContextTitleProvider = ({children}) => {
    const [ApiTitle, setApiTitle] = useState();

    const setContextTitleData = newData =>{
        setApiTitle(newData);
    };

    return (
        <ApiContextTitle.Provider value={{ApiTitle, setContextTitleData}}>{children}</ApiContextTitle.Provider>
    );
};

const useApiContextTitle =  () => {
    return useContext(ApiContextTitle);
};

export {ApiContextTitleProvider, useApiContextTitle};