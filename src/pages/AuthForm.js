import { Box, Input, Button,Text,Image } from "@chakra-ui/react"
import { useState,useEffect,useRef} from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginButton from "../components/LoginButton"
// import logo from "../public/music.svg"
import { Auth } from "../components/Auth"
import axios from "axios";
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Tooltip
} from '@chakra-ui/react'  


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

function Login({ setHaveAccount }) {
    const { isOpen, onOpen, onClose } = useDisclosure()


    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={'center'} 
        w={"100%"}
            flexDirection={"row"}
            shadow={"md"} 
            mt={50}
        >
            <Box w={"fit-content"} justifyContent={"center"} gap={2} alignItems={"center"} display={"flex"} flexDirection={"column"} bg={"white"} h={"80%"} p={10} rounded={"lg"}>
                <Auth register={false} login={true} />
                <Text fontSize={"small"} cursor={"pointer"} onClick={onOpen}>Forgot your password?</Text>
                <LoginButton text={"Login With Google"} />
                <Button bg={"black"} color={'white'} _hover={{backgroundColor:"black"}} mt={5} onClick={()=>setHaveAccount(false)}> Don't have an account?</Button> 
           {isOpen && <ResetPassword  isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
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
                <Button bg={"black"} color={'white'} _hover={{ backgroundColor: "black" }} mt={5} onClick={() => setHaveAccount(true)}>have an account?</Button>
                <LoginButton text={"Signup With Google"} />
            </Box>
    </Box> 
        
    )
}

function ResetPassword({ isOpen, onOpen, onClose }) {

    const cancelRef = useRef()
    const [findEmail, setFindEmail] = useState("")
    
    const handleFindEmail = e => {
        setFindEmail(e.target.value)
    }

    const handleRequest = () => {
        if (findEmail !== "") {
            axios.post("http://localhost:3001/auth/forgotpassword", { "email": findEmail }).then(res => {
                console.log(res)
                res.status === 200 ? toast.success("A Password Reset Link has been sent to your Email") : toast.error("Invalid Email!")
            }).catch(e => {
                console.log(e)
                toast.error("Sorry an Expected Error Occured!")
            })
        }
        else {
            toast.error("Please Enter your Email")
        }
    }
    return (
        <>
  
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                 Enter your Email To Reset Your Password!
                </AlertDialogHeader>
    
                <AlertDialogBody>
                        
                                <Box display={"flex"} flexDirection={"column"} gap={3}>
                                    <Input value={findEmail} placeholder={"Enter Your Email"} onChange={handleFindEmail} type={"email"} />
                                </Box>   
                        
                  
  
                </AlertDialogBody>
    
                        <AlertDialogFooter>
                            
                  <Button ref={cancelRef}onClick={onClose}>
                    Cancel
                    </Button> 
                    
                  <Button colorScheme={"green"} onClick={handleRequest} ml={3}>
                    Reset My Password
                  </Button>
                    
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )
}

export default AuthForm