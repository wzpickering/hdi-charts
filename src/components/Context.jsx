import React, {useState} from "react";

export const DataContext = React.createContext();

const DataProvider = (props)=>{




//value={states}

    return (
        <DataContext.Provider> 
            {props.children}
        </DataContext.Provider>
        )
}

export default DataProvider;