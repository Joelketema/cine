
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { Spinner } from '@chakra-ui/react'
import axios from "axios"
import toast from "react-hot-toast"

const Slider = ({title,genre,clickable}) => {
    const [movies, setMovies] = useState([{}])
    const [loading, setLoading] = useState(true)
    const [base, setBase] = useState("https://image.tmdb.org/t/p/w500")

    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/upcoming?api_key=a22ab0c7d6201b413ee9ab4a9ffdb946&language=en-US&page=1`, 
    };
    
    useEffect(() => {
       
        axios.request(options).then(response => {
            console.log(response)
            setMovies(response.data.results)
            setLoading(false)
    
        }).catch(e => {
            console.log(e)
            axios.get(``)
            toast.error("Sorry an error occured! retry in a few seconds")
        })
    }, [1])

    if (loading) return (
        <Box flexDirection={"column"} mt={8} p={3}>
        
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
              <Spinner color={"#213f87"} />
            </Box>  
        </Box>
    )
    
    return (
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}  flexDirection={"column"} mt={8} p={3}>
        <Text fontSize={["17px",null,"23px"]} color={"#213f87"} fontWeight={"medium"} p={5}>{title? title : "Now Showing"}</Text>
        <Box p={3} borderRadius={10}>    
            <Splide
               options={{
                perPage:4,
                    breakpoints: {
                        800: {
                    perPage:3,
                    },
                    500: {
                            perPage:3
                        },
                        400: {
                      perPage:3  
                    },
                    300: {
                        perPage:2
                    }
            },  
            rewind:true,
                        width: "100vw",
                        height: 'fit-content',
                type         : 'loop',
                gap          : '1rem',
             
            }} className='splide'>
                {
                    movies?.map((m) => {
                        return (
                            <SplideSlide className='ss'>
                                {clickable ? <Link to={`/Ticket/${m.id}`}>
                                    <Box bg={"#213f87"} textAlign={"center"} rounded={"md"} display={"flex"}
                                        flexDirection={{ base: "column", md: "row" }}
                                        justifyContent={"space-around"} alignItems={"center"} p={3}>
                                        <Image src={base + m.poster_path}
                                            boxSize={{
                                                base: '150px',
                                                md: "300px"
                                            }}
                                            h={{
                                                md: "350px"
                                            }}
                                            objectFit='cover' borderRadius={10} alt="movie poster" srcset="" />
                                        <Box display={"flex"} flexDirection={"column"} gap={3}>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1, 2]}>{m.title}</Text>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1, 2]}>29days Until Release</Text>
                                        </Box>
                                    </Box>
                                </Link> :
                                    <Box bg={"#213f87"} textAlign={"center"} rounded={"md"} display={"flex"}
                                        flexDirection={{ base: "column", md: "row" }}
                                        justifyContent={"space-around"} alignItems={"center"} p={3}>
                                        <Image src={base+m.poster_path}
                                            boxSize={{
                                                base: '150px',
                                                md: "300px"
                                            }}
                                            h={{
                                                md: "350px"
                                            }}
                                            objectFit='cover' borderRadius={10} alt="movie poster" srcset="" />
                                        <Box display={"flex"} flexDirection={"column"} gap={3}>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1, 2]}>{m.title}</Text>
                                        </Box>
                                    </Box>}
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