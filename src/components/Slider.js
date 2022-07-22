
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'

const Slider = ({title,genre}) => {
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
        <Box flexDirection={"column"} mt={8} p={3}>
        <Text fontSize={"lg"} pb={5}>{title ? title : "Now Showing"}</Text>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
              <Spinner color={"orangered"} />
            </Box>  
        </Box>
    )
    
    return (
        <Box flexDirection={"column"} mt={8} p={3}>
        <Text fontSize={"lg"} pb={5}>{title? title : "Now Showing"}</Text>
        <Box bg={"orangered"} p={3} borderRadius={10}>    
            <Splide
                options={{
                perPage: 3,
                rewind:true,
                    gap: '5rem',
                    height: 'max-content',
                    type         : 'loop',
                    gap          : '1rem',
                 
                }} className='splide'>
                {
                    movies?.map((m) => {
                        return (
                            <SplideSlide className='ss'>
                            <Link to={`/Ticket/${m.titleText?.text}`}>
                            <Box textAlign={"center"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                <Image src={m.primaryImage?.url} boxSize='150px'  objectFit='cover' borderRadius={10} alt="movie poster" srcset="" />
                                <Box><Text color={"white"} fontSize='md' noOfLines={[1, 2, 3]}>{m.titleText?.text}</Text></Box>    
                            </Box>
                            </Link>
                    </SplideSlide>
                        )
                    })
                }

                </Splide>
            </Box> 
        </Box>
    )
}

export default Slider