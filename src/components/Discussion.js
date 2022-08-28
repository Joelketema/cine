
import { Box, Text,Image } from "@chakra-ui/react"
import { useState, useEffect,useContext } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Input,Button } from '@chakra-ui/react'
import { AuthContext } from "../context/AuthContext"
import { Link } from "react-router-dom"
import toast from 'react-hot-toast'
// import "../assets/review.css"

const Discussion = ({title}) => {

    const [movies, setMovies] = useState([{}])
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    const [discussion, setDiscussion] = useState("")
    
    const handleDiscussion = () => {
        discussion !=="" ? toast.success("Your Chat will be Posted after Sometime. Thank You😊")
            : toast.error("Please fill in the provided space")
        
        setDiscussion("")
    }

    const handleDiscussionChange = (e) => setDiscussion(e.target.value)


    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '30f8f07841msh32c3146f1e35d96p1df6c8jsn66be063d993c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=10&page=1&titleType=movie&genre=Action&year=2020`, options)
        .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies(response.results)
            })
        .catch(err => console.error(err));
    }, [1])
    
 
    return (
        <Box mt={5} p={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Text fontSize={["17px",null,"23px"]} color={"#213f87"} fontWeight={"medium"} pb={5}>{title ? title : "Reviews"}</Text>
            <Box display={"flex"} flexDirection={"column"} bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)' p={3}
                minHeight={"500px"} maxHeight={"500px"} overflowY={"scroll"}  borderRadius={10}>    
        <Grid templateColumns='repeat(1, 1fr)' templateRows='repeat(4, 1fr)' gap={5}>
                {movies?.map(m => {
                    return (
                <GridItem>
                        <Box w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                        <Image src={m.primaryImage?.url} boxSize='100px' objectFit='cover' borderRadius={"50%"} alt="movie poster" srcset="" />
                                <Box className="bubble" boxShadow={'md'} bg="black" minWidth={"200px"} maxWidth={"300px"} display={"flex"} flexDirection={"column"} textAlign={"left"} p={3} borderRadius={"10px"}>
                                <Text fontSize={"s"}  color="white" mb={5} >Alemu Sisay</Text>
                                <Text fontSize={"md"} color="white" w={"100%"}>This was A very Good Movie!</Text>        
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