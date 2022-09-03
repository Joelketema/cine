
import { Box, Text, Button,Image } from "@chakra-ui/react"
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import { Spinner } from '@chakra-ui/react'
import { Link,useNavigate } from 'react-router-dom'
import { useContext,useEffect,useState } from "react"
import { AuthContext } from "../context/AuthContext";
import axios from "axios"
import toast from "react-hot-toast"
import "../assets/hero.css"

const Hero = ({ movie,loading,setLoading }) => {

    const [base, setBase] = useState("https://image.tmdb.org/t/p/w500")
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    
    const {movietitle} = useContext(AuthContext)
    const [selectedmovie, setSelectedMovie] = movietitle

    
    const navigate = useNavigate()

    console.log(movie)

    

    const handleRequest = () => {
        if (auth) {
            if (selectedmovie !== "") {

                axios.post('https://server-cproject.vercel.app /api/initializeCart', { "movieName": selectedmovie }
                    , {
                        headers: {
                
                            autherize: localStorage.getItem("TOKEN")
                        }
                    }).then(res => {

                       navigate(`/Book`) 
                    }).catch(e => {
                        console.log(e)
                        toast.error(e.message)
                    })
            }
        }
        else navigate("/auth")
        
    }

    function formatSeconds(minute) {
        minute = Number(minute);
        var h = Math.floor(minute / 3600);
        var m = Math.floor(minute % 3600 / 60);
        var s = Math.floor(minute % 3600 % 60);
    
        var hourDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
        var minuteDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
        var secondDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
        return hourDisplay + minuteDisplay + secondDisplay;
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
            <Image src={base + movie.poster_path} boxSize={{
                base: '150px',
                md: "300px",
                lg:"500px"
            }} height={"200px"} objectFit='cover' borderRadius={10} alt={`${movie.title} movie poster`} />
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
                display={"flex"} flexDirection={"column"} justifyContent={"space-around"} alignItems={"flex-start"}
                
                bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)'
                p={5} rounded={"md"}>
                <Text noOfLines={[0,1,2]}>Title : {movie.title}</Text>
                <Text>Duration : {formatSeconds(movie.runtime)}</Text>
                <Text>Rating : {(movie.vote_average).toFixed(1)}/10</Text>
                <Text>Genres: {movie.genres[0].name + "," + movie.genres[1].name}...</Text>
                <Text w={"100%"}>"{movie.tagline}"</Text>
                <Button onClick={handleRequest} variant='outline' _hover={{backgroundColor:"#213f87"}} rightIcon={<ConfirmationNumberRoundedIcon />}>{auth ? "Book Your Ticket" : "Sign up to Book"}</Button>
            </Box>
        </Box>
    </Box>
    )
}

export default Hero