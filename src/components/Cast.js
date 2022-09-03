
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import { Spinner } from '@chakra-ui/react'

const Cast = ({title,movie}) => {
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    const [base, setBase] = useState("https://image.tmdb.org/t/p/w500")
    console.log("Cast movie")

      console.log(movie.id)
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,

    };

    console.log(options.url)
    
    useEffect(() => {
       
        axios.request(options).then(response => {
            console.log("HERE CAST")
            console.log(response.data.cast)
            setCast(response.data.cast)
          
            setLoading(false)

        }).catch(e => {
            console.log(e)
            // toast.error(e.message)
        })
    }, [movie])
    
    console.log(cast)
    // if (loading) return (
    //     <Box flexDirection={"column"} mt={8} p={3}>
    //     <Text fontSize={"lg"} pb={5}>{title ? title : "Now Showing"}</Text>
    //         <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
    //           <Spinner color={"#213f87"} />
    //         </Box>  
    //     </Box>
    // )
    
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
                    cast?.map((m) => {
                        return (
                            <SplideSlide className='ss'>
                           
                            <Box bg={"#213f87"} textAlign={"center"} rounded={"md"} display={"flex"} minH={{base:"40vh",md:"80vh"}} maxH={{base:"40vh",md:"80vh"}}
                                flexDirection={"column"}
                                justifyContent={"space-around"} alignItems={"center"} p={3}>
                                    <Image src={base + m.profile_path} alt={m.original_name}
                                boxSize={{
                                    base: '150px',
                                    md: "300px"
                                }}
                                h={{
                                    md:"350px"
                                }}
                                            objectFit='cover' borderRadius={10} srcset="" />
                                        <Box display={"flex"} flexDirection={"column"} gap={3}>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1]}>{`${m.original_name}`}</Text>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1]}>{`Plays: ${m.character}`}</Text>
                
                                        </Box>    
                            </Box>
                            
                    </SplideSlide>
                        )
                    })
                }

                </Splide>
            </Box> 
        </Box>
    )
}

export default Cast