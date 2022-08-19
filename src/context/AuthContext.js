import { useState,createContext } from "react"

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    
    const [auth, setAuth] = useState(false)   
    const [accept, setAccept] = useState(false)
    const [user,setUser] = useState({})
    const [selectedmovie,setSelectedMovie] = useState("")
    
    return (
        <AuthContext.Provider value={{ secure: [auth, setAuth], client:[user,setUser], term: [accept, setAccept], movietitle: [selectedmovie,setSelectedMovie]}}>
            {props.children}
        </AuthContext.Provider> 
    )
}

 