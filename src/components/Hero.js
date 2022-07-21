
import { Box, Text, Button,Image } from "@chakra-ui/react"
import ConfirmationNumberRoundedIcon from '@mui/icons-material/ConfirmationNumberRounded';

import "../assets/hero.css"

const Hero = ({ movie }) => {
    console.log(movie)
    return (
        <Box zIndex={-5} mt={5} className="overlay" backgroundPosition={"center"} backgroundSize={"contain"}backgroundImage={movie.primaryImage?.url} h={"400px"} w={"100%"}>
            <Box zIndex={5} display={"flex"} top={"20%"} position={"relative"}justifyContent={"space-around"} alignItems={"center"}>
                <Image  src={movie.primaryImage?.url} boxSize='130px' height={"200px"} objectFit='cover' borderRadius={10} alt="movie poster" />
                <Box display={"flex"} flexDirection={"column"} gap={5} color={"white"} bg={"orangered"} p={3} height={"max-content"} borderRadius={10}>
                    <Text>Movie Title : {movie.titleText?.text}</Text>
                    <Text>Duration : {movie.titleText?.text}</Text>
                    <Text>Rating : {movie.ratingsSummary?.aggregateRating}/10</Text>
                    <Text>Genre : {movie.genres?.genres[0].text + ","+ movie.genres?.genres[1].text}</Text>
                    <Button variant='outline' rightIcon={<ConfirmationNumberRoundedIcon/>}>Book A Ticket</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Hero