import { Box, Text, Button, Input, InputGroup, InputLeftAddon,InputRightAddon, InputRightElement } from "@chakra-ui/react"

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
} from '@chakra-ui/react'
  
import { useState,useEffect,useCallback } from "react";

import toast from "react-hot-toast"
import axios from "axios"

import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import { useNavigate} from 'react-router-dom'

export function Auth({ register, login }) { 
    const navigate = useNavigate()

    const [show, setShow] = useState(false)
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(false)
    const [user,setUser] = useState({})
    
    const handleEmailChange = event => setEmail(event.target.value)
    const handleNameChange = event => setName(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)



    function makeRequest(e) {
        e.preventDefault()

        if (!login) {
        
            
            axios.post("http://localhost:3001/auth/register",
                    {
                    "Name": name,
                    "Email": email,
                    "password": password})
                .then(response => {
                    
                    if(response.data === "An Email Verification has been sent to your Email!")
                        toast.success(response.data)
                    else
                        toast.error(response.data)
               
                }).catch(e=>toast.error(e.message))
        }

        else {
     
            axios.post("http://localhost:3001/auth/login", {
                "Email": email,
                "password": password
            }).then(res => {
           console.log(res.headers['autherize'])
                if (res.headers['autherize'])
                {
                    localStorage.setItem("TOKEN", res.headers['autherize'])
                    toast.success("Successfully Logged in!")
                     navigate("/")
                }
                
                else if(res.data ==="Invaid UserName or Password")
                {
                   
                    toast.error("Invaid Email or Password!")
                }
                else {toast.error(res.data)
                    
                }
                
                
            }).catch(e=>toast.error(e.message))
        }
        
    }

    
    return (
        <> 
            <form onSubmit={makeRequest}>
            <FormControl
             
    
                isInvalid = {isError}
                w={"100%"}
                mt={10}
                p={5}
             display={"flex"}
             flexDirection={"column"}
             justifyContent={"space-around"}
             alignItems={"center"}
             gap={3}
            > 
                {register && <FormLabel color={"#213f87"} fontWeight={"bold"}>Enter your Name, Email And Password to register!</FormLabel>}
                {!register && <FormLabel color={"#213f87"} fontWeight={"bold"}>Enter your Email And Password to Login!</FormLabel>}
                {register && 
                    <Box
                    minWidth={{
                        base: "100%",
                        md:"100%"
                    }} maxWidth={{
                        base: "100%",
                        md:"100%"
                    }}>
                        <InputGroup>
                            <InputLeftAddon pointerEvents={"none"} color={"#213f87"} children={<AccountCircleRoundedIcon  />} />
                            <Input color={"black"} value={name} onChange={handleNameChange} placeholder={"Enter your Name...."} type={"text"}/>
                        </InputGroup>
                </Box>
                }
                <Box
                minWidth={{
                    base: "100%",
                    md:"100%"
                }} maxWidth={{
                    base: "100%",
                    md:"100%"
                }}>
                    <InputGroup>
                        <InputLeftAddon pointerEvents={"none"} color={"#213f87"} children={<EmailRoundedIcon  />} />
                        <Input color={"black"} value={email} onChange={handleEmailChange} placeholder={"Enter your email...."} type={"email"}/>
                    </InputGroup>
                </Box>

                <Box minWidth={{
                    base: "100%",
                    md:"100%"
                }} maxWidth={{
                    base: "100%",
                    md:"100%"
                }}>
                    <InputGroup>
                        <InputLeftAddon pointerEvents={"none"} color={"#213f87"} children={<KeyRoundedIcon  />} />
                        <Input value={password} color={"black"} onChange={handlePasswordChange} placeholder={"Enter a secure password"} type={show?"text" : "password"}  />
                        {/* <InputRightElement>
                          <RemoveRedEyeRoundedIcon onClick={()=>setShow(!show)} />
                        </InputRightElement> */}
                    </InputGroup>
                  
                    
                        <FormHelperText
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"} textAlign={"center"}>
                        <ContactSupportRoundedIcon color={"#213f87"} />
                        {register && "Password must be greater than 7 characters"}
                        {!register && "Passwords and Email are case senstitive"}
                        </FormHelperText>
                    
                </Box>

                <FormErrorMessage>{error}</FormErrorMessage>
                </FormControl>
                <Button type="submit" bg={"#213f87"} color={"white"} _hover={{color:"white"}}>Continue</Button>
                </form>
        </>
    )
}