
import { Box, Text, Button,Spinner} from "@chakra-ui/react"
import axios from "axios"
import { Link,useParams,useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function VerifyPage({ setHaveAccount }) {
    const [valid, setValid] = useState(false)
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://server-cproject.vercel.app /auth/${params.id}/verify/${params.token}`).then(response => {
            response.data === "verified" ? setValid(true) : setValid(false)

            setLoading(false)
        }).catch(e => {
            console.log(e)
            toast.error("Sorry an Expected Error Occured!")

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
                    <>
                    <Text fontSize='lg'>Succesfully Verified! Click Login to login to your Account</Text>
                        <Button onClick={() => {
                            // setHaveAccount(false)
                            navigate("/auth")
                        }} bg={"black"} color={'white'} _hover={{ backgroundColor: "black" }} mt={5}>Login</Button> 
                    </> :
                    <>
                    <Text>404</Text>    
                    </>
                
                
                }
            </Box>
    </Box> 

    )
    
}