import { Box, Input, Button,Text,Image } from "@chakra-ui/react"
import { useState,useEffect} from "react"
import {Link,useNavigate} from "react-router-dom"
// import logo from "../public/music.svg"
import { Auth } from "../components/Auth"
import { Toaster } from "react-hot-toast"


const AuthForm = () => {

    const [haveAccount, setHaveAccount] = useState(false)
   const navigate = useNavigate()
    const [pass,setPass] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("TOKEN")) {
           navigate("/")
        }
        else
            setPass(true)
            
    })
    
    if (pass) {
        return (
            <>
                <Box  w={"100vw"} h={"100vh"}>
                    <Box
                        _before={{
                            content: '""',
                            position: "absolute",
                            top: 0, left: 0, right: 0, bottom: 0,
                            w: "100vw", h: "100vh",
                            bg: "#213f87", opacity: 0.5
                        
                        }}
                    >
                    
                    </Box>
                    <Toaster
                        toastOptions={{
                            success: {
                                style: {
                                    background: 'green',
                                    color:"white"
                                },
                              },
                              error: {
                                style: {
                                      background: 'red',
                                      color:"white"
                                },
                              },
                                }}
                    />
                </Box>
                <Box position={"absolute"} top={0} left={0} right={0} bottom={0}>
                    {haveAccount && <Login setHaveAccount={setHaveAccount} />}
                    {!haveAccount && <Signup setHaveAccount={setHaveAccount} />}
                </Box>

            </>
        )
    }
}

function Login({setHaveAccount}) {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={'center'} 
        w={"100%"}
            flexDirection={"row"}
            shadow={"md"} 
            mt={50}
        >
            <Box w={"fit-content"} bg={"white"} h={"80%"} p={10} rounded={"lg"}>
                <Auth register={false} login={true} />
                <Button bg={"black"} color={'white'} _hover={{backgroundColor:"black"}} mt={5} onClick={()=>setHaveAccount(false)}> Don't have an account?</Button> 
            </Box>
    </Box> 
        
    )
}


function Signup({setHaveAccount}) {
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={'center'}
        w={"100%"}
            flexDirection={"row"}
            shadow={"md"} 
            mt={50}
        >
            <Box w={"fit-content"}  bg={"white"} h={"80%"} p={10} alignSelf={"center"}  rounded={"lg"}>
                <Auth register={true} login={false} />
                <Button bg={"black"} color={'white'} _hover={{backgroundColor:"black"}} mt={5} onClick={()=>setHaveAccount(true)}>have an account?</Button>
            </Box>
    </Box> 
        
    )
}

export default AuthForm