const { createContext, useContext, useState } = require("react");

const chatContext = createContext() ;

const ChatProvider = ({children}) => {
    const [user ,setUser] = useState() ;
    return <chatContext.Provider value = {{user ,setUser}}>
        {children}
    </chatContext.Provider>
}

export const ChatState = () => {
    return useContext(chatContext) ;
}

export default ChatProvider ;