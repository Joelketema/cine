
import { Box, Text, Button,Image } from "@chakra-ui/react"
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';
import { Spinner } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import "../assets/hero.css"

const Hero = ({ movie,loading,setLoading }) => {
    console.log(movie)

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
        <Box mt={5} className="overlay" backgroundPosition={"center"} backgroundSize={"contain"}backgroundImage={movie.primaryImage?.url} h={"400px"} w={"100%"}>
            <Box zIndex={5} display={"flex"} top={"20%"} position={"relative"}justifyContent={"space-around"} alignItems={"center"}>
                <Image  src={movie.primaryImage?.url} boxSize='130px' height={"200px"} objectFit='cover' borderRadius={10} alt="movie poster" />
                <Box display={"flex"} flexDirection={"column"} gap={5} color={"white"} bg={"orangered"} p={3} height={"max-content"} borderRadius={10}>
                    <Text>Movie Title : {movie.titleText?.text}</Text>
                    <Text>Duration : {formatSeconds(movie.runtime?.seconds)}</Text>
                    <Text>Rating : {movie.ratingsSummary?.aggregateRating}/10</Text>
                    <Text>Genre : {movie.genres?.genres[0].text + ","+ movie.genres?.genres[1].text}</Text>
                   <Link to={"/book"}><Button variant='outline' rightIcon={<ConfirmationNumberRoundedIcon/>}>Book A Ticket</Button></Link>
                </Box>
              
            </Box>
        </Box>
    )
}

export default Hero