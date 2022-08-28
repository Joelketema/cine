
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import SliderHero from "./SliderHero";

const BigSlider = ({ title, genre }) => {
    
    genre = "Action"

    const [movies, setMovies] = useState([{}])
    const [loading,setLoading] = useState(true)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '30f8f07841msh32c3146f1e35d96p1df6c8jsn66be063d993c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=10&page=1&titleType=movie&genre=${genre}&year=2020`, options)
        .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovies(response.results)
                setLoading(false)
            })
        .catch(err => console.error(err));
    }, [1])
    
    if (loading) return (
        <Box flexDirection={"column"} mt={0} p={3}>
        {/* <Text fontSize={"lg"} pb={5}>{title ? title : "Now Showing"}</Text> */}
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
              <Spinner color={"#213f87"} />
            </Box>  
        </Box>
    )
    
    return (
        <Box flexDirection={"column"} w={"100%"} mt={{ base: -5, md: -5, lg: -10 }} >
            {/* <Text pl={3} fontSize={"lg"} pb={5}>{title ? title : "Now Showing"}</Text> */}
            <Box  h={"100vh"} w={"100%"}>    
                <Splide
                    
                options={{
                perPage: 1,
                rewind:true,
                width : "100vw",
                    height: '100vh',
                    type         : 'loop',
                    gap          : '1rem',
                 
                }} className='splide'>
                {
                    movies?.map((m) => {
                        return (
                            <SplideSlide  className='ss'>
                                <SliderHero movie={m} />
                    </SplideSlide>
                        )
                    })
                }

                </Splide>
            </Box> 
        </Box>
    )
}

export default BigSlider

