
import { Box, Text, Button,Image } from "@chakra-ui/react"
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import { Spinner } from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast"
import axios from "axios";
// import "../assets/hero.css"


const SliderHero = ({ movie, loading, setLoading }) => {
    const [onemovie, setOneMovie] = useState([{}])
    const [title, setTitle] = useState("")
    const [base, setBase] = useState("https://image.tmdb.org/t/p/w500")
    

    function formatSeconds(seconds) {
        var date = new Date(1970,0,1);
        date.setSeconds(seconds);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }

    if (loading) return (
        <Box bg={"white"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} zIndex={-5} mt={5}  h={"400px"} w={"100%"}>
            <Spinner color={"#213f87"} />
        </Box>
    

    )
    return (
        <Box
          
            backgroundSize={"stretch"} backgroundImage={base + movie.backdrop_path}
            display={"flex"}
            justifyContent={"center"}
                alignItems={"center"}
                shadow={"lg"}

       w={"100vw"} h={{ base: "100vh", md: "100vh" }}>
            
            <Box
                
            _before={{
                content: '""',
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                w: "100vw", h: "100%",
                bgGradient:'linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)',
                    opacity: 0.8,
            
                
                }}>
                
            </Box>

            <Box w={"100%"} display={"flex"} justifyContent={"space-around"} alignItems={"center"} position={"relative"} zIndex={1}  gap={5}  >
                <Image src={base+movie.poster_path} boxSize={{
                    base: '150px',
                    md: "300px",
                    lg:"500px"
                }} height={"200px"} objectFit='cover' borderRadius={10} alt="movie poster" />
                <Box color={"white"}
                    minHeight={{
                        base: "300px",
                        md:"500px"
                    }}
                    maxHeight={{
                        base: "max-content",
                        md:"500px"
                    }}
                    minWidth={{
                        base: "max-content",
                        md:"300px"
                    }}
                    maxWidth={{
                        base: "max-content",
                        md:"300px"
                    }}
                    display={"flex"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"center"}
                    
                    bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)'
                    p={3} rounded={"md"}>
                    <Text noOfLines={[0,1,2]}>Title : {movie.title}</Text>
                    <Text>Rating : {movie.vote_average}/10</Text>
                    <Text>Release Date : {movie.release_date}</Text>
                    <Link to={`/Ticket/${movie.id}`} ><Button variant='outline' _hover={{backgroundColor:"#213f87"}} rightIcon={<ConfirmationNumberRoundedIcon />}>Check it out</Button></Link>
                </Box>
            </Box>
        </Box>
    )
}

export default SliderHero