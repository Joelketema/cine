
import { Box, Text,Image } from "@chakra-ui/react"
import { useState, useEffect,useContext } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from "axios"
// import "../assets/review.css"

const Discussion = ({title}) => {

    const [chat, setChat] = useState([{}])
    const [empty,setEmpty] = useState(true)
    const { secure,movietitle } = useContext(AuthContext)
    const [selectedmovie, setSelectedMovie] = movietitle
    const [auth, setAuth] = secure
    const [discussion, setDiscussion] = useState("")

    // console.log(selectedmovie)
    
    const handleDiscussion = () => {

        if (discussion !== "") {
            console.log(discussion.length)
            if (discussion.length < 50 && discussion.length > 4) {
                axios.post("https://server-cproject.vercel.app/api/postChat", {
                    "movie": selectedmovie,
                    "message": discussion
                }, {
                    headers: {
                        autherize: localStorage.getItem("TOKEN")
                    }
                }).then(response => {
                    if (response.status === 200) {
                        toast.success("Your Chat will be Posted after Sometime. Thank You😊")
                    }
                    else {
                        console.log(response)
                        toast.error("Sorry an Error Occured!")
                    }
                }).catch(e => {
                    console.log(e)
                    toast.error("Network Error!")
                })
            }
            else if(discussion.length < 4) {
                toast.error("Review Characters Should be minimum of 4!")   
            }
            else toast.error("Max Character length Exceeded!")
            
        }
        else toast.error("Please fill in the provided space")
        
        setDiscussion("")
    }

    useEffect(() => {
        if (selectedmovie !== "") {
            axios.post("https://server-cproject.vercel.app/api/getChat", { "movie": selectedmovie }, {
                headers: {
                    autherize: localStorage.getItem("TOKEN")
                }
            }).then(response => {
                console.log(response)
                if (response.data !== undefined && response.data.length > 0) {
                    console.log(response)
                    setChat(response.data)
                    setEmpty(false)
                }
                else {
                    setEmpty(true)
                }

        
            })
        }
    },[selectedmovie])

    const handleDiscussionChange = (e) => setDiscussion(e.target.value)

    
 
    return (
        <Box mt={5} p={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={["17px",null,"23px"]} color={"#213f87"} fontWeight={"medium"} pb={5}>{title ? title : "Reviews"}</Text>
            <Box display={"flex"} flexDirection={"column"} bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)' p={3}
                minHeight={"500px"} maxHeight={"500px"} overflowY={"scroll"}  borderRadius={10}>    
                <Grid templateColumns='repeat(1, 1fr)' templateRows='repeat(4, 1fr)' gap={5}>
                    {
                        empty ? 
                        <GridItem>
                            <Box w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                                   
                                    <Text fontSize={"s"}  color="white" mb={5} >{"Be the First to Leave a Comment"}</Text>
                                    
                        </Box>             
                            </GridItem>
                            :

                
                chat?.map(m => {
                    return (
                <GridItem>
                        <Box w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                        <Image src={"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"}  boxSize='100px' objectFit='cover' borderRadius={"50%"} alt="user avatar" srcset="" />
                                <Box className="bubble" boxShadow={'md'} bg="black" minWidth={"200px"} maxWidth={"300px"} display={"flex"} flexDirection={"column"} textAlign={"left"} p={3} borderRadius={"10px"}>
                                <Text fontSize={"s"}  color="white" mb={5} >{m.user}</Text>
                                <Text fontSize={"md"} color="white" w={"100%"}>{m.message}</Text>        
                                <Text fontSize={"md"} color="white" w={"100%"}>{new Date(m?.postedOn).getFullYear() + "-" +new Date(m?.postedOn).getMonth() + "-"+ new Date(m?.postedOn).getDate()}</Text>        
                        </Box>
                                
                    </Box>             
                </GridItem>
            )
        })}
            </Grid> 
                 
        </Box>
        {
                !auth ?
            <Box mt={5}>
                <Link to={"/auth"}>
                    <Button variant='outline' color={"white"} bg={"#213f87"} _hover={{ backgroundColor: "#213f87" }}>Sign Up to Chat!</Button>
                </Link>
            </Box> :
                    
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={15}>
                    <Input variant='outline' value={discussion} onChange={handleDiscussionChange} placeholder='Be A Part of the conversation!' mt={5} />
                    <Button onClick={handleDiscussion} bg={"black"} _hover={{backgroundColor:"black"}} color="white" variant="solid">Post</Button> 
                </Box>  
            }
   
    </Box>
    )

}

export default Discussion