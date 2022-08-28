
import { Box, Text, Button,Image } from "@chakra-ui/react"
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import { Spinner } from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom'
import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
import "../assets/hero.css"

const Hero = ({ movie,loading,setLoading }) => {

    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    
    const {movietitle} = useContext(AuthContext)
    const [selectedmovie, setSelectedMovie] = movietitle

    const navigate = useNavigate()

    const handleRequest = () => {
        if (auth) {
            if (selectedmovie !== "") {

                axios.post('https://server-cproject.vercel.app/api/initializeCart', { "movieName": selectedmovie }
                    , {
                        headers: {
                
                            autherize: localStorage.getItem("TOKEN")
                        }
                    }).then(res => {

                       navigate(`/Book`) 
                    }).catch(e => console.log(e))
            }
        }
        else navigate("/auth")
        
    }

    function formatSeconds(seconds) {
        var date = new Date(1970,0,1);
        date.setSeconds(seconds);
        return date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
    }

    if (loading) return (
        <Box bg={"white"} display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"} zIndex={-5} mt={5}  h={"400px"} w={"100%"}>
            <Spinner color={"orangered"} />
        </Box>
    

    )
    return (
        <Box
          
        bgGradient ='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)'
        display={"flex"}
        justifyContent={"center"}
            alignItems={"center"}
            shadow={"lg"}

   w={"100vw"} h={{ base: "100vh", md: "100vh" }}>
        

        <Box w={"100%"} display={"flex"} justifyContent={"space-around"} alignItems={"center"} position={"relative"} zIndex={1}  gap={5}  >
            <Image src={movie.primaryImage?.url} boxSize={{
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
                <Text noOfLines={[0,1,2]}>Title : {movie.titleText?.text}</Text>
                <Text>Duration : {formatSeconds(movie.runtime?.seconds)}</Text>
                <Text>Rating : {movie.ratingsSummary?.aggregateRating}/10</Text>
                <Text>Genre : {movie.genres?.genres[0].text + ","+ movie.genres?.genres[1].text}</Text>
                <Button onClick={handleRequest} variant='outline' _hover={{backgroundColor:"#213f87"}} rightIcon={<ConfirmationNumberRoundedIcon />}>{auth ? "Book Your Ticket" : "Sign up to Book"}</Button>
            </Box>
        </Box>
    </Box>
    )
}

export default Hero