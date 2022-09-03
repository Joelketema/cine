import {Box,Text,Image,Button,Input,InputGroup,InputRightAddon} from "@chakra-ui/react"
import Logo from "../components/Logo"
import {useState,useEffect,useContext,useRef} from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Tooltip
} from '@chakra-ui/react'

import toast from "react-hot-toast"

const ProfilePage = () => {
    const { client } = useContext(AuthContext)
    const [user, setUser] = client
    

    useEffect(() => {
        axios.get("https://server-cproject.vercel.app /auth/getProfile", {
            headers: {
      
              autherize: localStorage.getItem("TOKEN")
            }
          }).then(res=>{
              console.log(res.data)
              setUser(res.data)
        })
    },[1])
    
    return (
        <Box>
            <Logo first={"G"} second={"O"} />
            <ViewProfile user={user} />
        </Box>
    )
}

function ViewProfile({ user }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [flag,setFlag] = useState(false)

console.log(isOpen)
    return (
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Image rounded={"full"} src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"}
                boxSize={"150px"} objectFit={"cover"} boxShadow={"md"}
                />
                <Text fontSize={"md"} fontWeight={"medium"}>{user.Name}</Text>
            </Box>

            <Box>
                <Button mr={5} _hover={{ backgroundColor: "black" }} onClick={() => {
                    setFlag(false)
                    onOpen()
                }} alignSelf={"flex-end"} mt={4} bg={"Black"} color={"white"}>Change Password</Button>
                <Button mr={5} _hover={{backgroundColor:"red"}}  onClick={() => {
                    setFlag(true)
                    onOpen()
                }} alignSelf={"flex-end"} mt={4} bg={"red"} color={"white"}>Delete Account</Button>
            </Box>
            {isOpen && <ChangePassword flag={flag} isOpen={isOpen} onOpen={onOpen} onClose={onClose} />}
        </Box>
    )
}

function ChangePassword({ flag, isOpen, onOpen, onClose }) {
    const cancelRef = useRef()
    const navigate = useNavigate()
    
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    const [oldpassword,setOldPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [show,setShow] = useState(false)

    const handleOldPassword = e => {
        
        setOldPassword(e.target.value)
    }
    const handleNewPassword = e => {
       
        setNewPassword(e.target.value)
    }
    
    const handleRequest = () => {

        if (oldpassword !== "" && newpassword !== "") {
            axios.patch("https://server-cproject.vercel.app /auth/editProfile",{"oldPassword" : oldpassword,"newPassword":newpassword}, {
                headers: {
          
                  autherize: localStorage.getItem("TOKEN")
                }
            }).then(res => {
                console.log(res.status)
                if(res.status === 200)
                    toast.success(res.data)
                else
                toast.error(res.data) 
            })
        }
        else {
            toast.error("Please Fill both Fields!")
        }
    }

    const handleDelete = () => {
        axios.delete("https://server-cproject.vercel.app /auth/removeProfile", {
            headers: {
      
              autherize: localStorage.getItem("TOKEN")
            }
        }).then(res => {
            setAuth(false)
            localStorage.removeItem("TOKEN")
            navigate("/")
            console.log(res)
          })
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
                {flag ? "Delete Your account?" : "Change your Password!"}
                </AlertDialogHeader>
    
                <AlertDialogBody>
                            {flag ? <Text> "Note that this Process can not be undo!" </Text>
                                : 
                                <Box display={"flex"} flexDirection={"column"} gap={3}>
                                    <InputGroup>
                                    <Input value={oldpassword} placeholder={"Enter Your Old Password"} onChange={handleOldPassword} type={show ? "text" : "password"} />
                                    <InputRightAddon onClick={()=>setShow(!show)}  color={"#213f87"} children={<RemoveRedEyeRoundedIcon  />} />
                                    </InputGroup>
                                    
                                    <InputGroup>
                                    <Input value={newpassword} placeholder={"Enter Your New Password"} onChange={handleNewPassword} type={show ? "text" : "password"} />
                                    <InputRightAddon onClick={()=>setShow(!show)}  color={"#213f87"} children={<RemoveRedEyeRoundedIcon  />} />
                                    </InputGroup>
                                </Box>   
                        }
                  
  
                </AlertDialogBody>
    
                        <AlertDialogFooter>
                            
                  <Button ref={cancelRef}onClick={onClose}>
                    Cancel
                    </Button> 
                    
                  <Button colorScheme={flag ? "red" :"green"} onClick={flag?handleDelete :handleRequest} ml={3}>
                    {flag?"Accept and Delete" : "Change Password"}
                  </Button>
                    
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      )
}
export default ProfilePage