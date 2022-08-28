
import { Box, Text, Button,Spinner,Input,InputGroup,InputRightAddon} from "@chakra-ui/react"
import axios from "axios"
import { Link,useParams,useNavigate,Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import toast from "react-hot-toast"
export default function ForgotPage() {

    const [valid, setValid] = useState(false)
    const [uid,setUID] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [show,setShow] = useState(false)

    
    const params = useParams()
    
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

  
    const handleNewPassword = e => {
       
        setNewPassword(e.target.value)
    }

    const handleRequest = () => {

        axios.patch("https://server-cproject.vercel.app/auth/resetPassword", { "uid": uid, "password": newpassword }).then(res => {
            console.log(res)
           
            if (res.status === 200) {
                toast.success("Password Successfully Reset!")
                navigate("/auth")
            }
            else {
                toast.error("Sorry an unexpected Error Occured!")
            }
            
        })
        
    }

    useEffect(() => {
        if (params.id !== "") setUID(params.id)
        
        axios.get(`https://server-cproject.vercel.app/auth/${params.id}/forgot/${params.token}`).then(response => {
            response.status === 200 ? setValid(true) : setValid(false)
            setLoading(false)
        })
    }, [valid])
    
    if (loading) {
        return (
            <Box flexDirection={"column"} mt={8} p={3}>
           
                <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
                  <Spinner color={"#213f87"} />
                </Box>  
            </Box>

        )
    }
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={'center'} 
        w={"100%"}
            flexDirection={"row"}
            shadow={"md"} 
            mt={50}
        >
            <Box w={"fit-content"} bg={"white"} h={"80%"} p={10} rounded={"lg"}>
                {valid ?
                  
                    <Box display={"flex"} flexDirection={"column"} gap={3}>
                                    <InputGroup>
                                    <Input value={newpassword} placeholder={"Enter Your New Password"} onChange={handleNewPassword} type={show ? "text" : "password"} />
                                    <InputRightAddon onClick={()=>setShow(!show)}  color={"#213f87"} children={<RemoveRedEyeRoundedIcon  />} />
                        </InputGroup>
                        <Button colorScheme={"green"} onClick={handleRequest} ml={3}>
                             Set Password
                         </Button>
                    </Box>   
                     :
                    <>
                    <Text>404</Text>    
                    </>
                
                
                }
            </Box>
    </Box> 

    )
    
}