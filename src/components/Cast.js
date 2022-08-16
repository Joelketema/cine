
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"
import { Spinner } from '@chakra-ui/react'

const Cast = ({title,genre}) => {
    const [cast, setCast] = useState([])
    const [loading, setLoading] = useState(true)
    console.log("Cast")
    const options = {
        method: 'GET',
        url: 'https://random-user.p.rapidapi.com/getuser',
        headers: {
          'X-RapidAPI-Key': '30f8f07841msh32c3146f1e35d96p1df6c8jsn66be063d993c',
          'X-RapidAPI-Host': 'random-user.p.rapidapi.com'
        }
      };
    useEffect(() => {

            axios.request(options)
                .then(response => {
                    setCast(prev => [...prev, response.data.results[0]])
                    setLoading(false)
                })
                .catch(err => console.error(err));
    }, [1])
    
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
                            <Link to={`/Ticket/${m.titleText?.text}`}>
                            <Box bg={"#213f87"} textAlign={"center"} rounded={"md"} display={"flex"}
                                flexDirection={"column"}
                                justifyContent={"space-around"} alignItems={"center"} p={3}>
                                    <Image src={m.picture?.large}
                                boxSize={{
                                    base: '150px',
                                    md: "300px"
                                }}
                                h={{
                                    md:"350px"
                                }}
                                            objectFit='cover' borderRadius={10} alt="movie poster" srcset="" />
                                        <Box display={"flex"} flexDirection={"column"} gap={3}>
                                            <Text color={"white"} fontSize='md' noOfLines={[0, 1, 2]}>{`${m.name?.first} " "${m.name?.last}`} </Text>
                
                                        </Box>    
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

export default Cast