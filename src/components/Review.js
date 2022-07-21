
import { Box, Text,Image } from "@chakra-ui/react"
import { useState, useEffect } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
// import "../assets/review.css"
import { Spinner } from '@chakra-ui/react'


const Review = ({title}) => {

    const [movies, setMovies] = useState([{}])
    const [loading, setLoading] = useState(true)
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '30f8f07841msh32c3146f1e35d96p1df6c8jsn66be063d993c',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
        fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=mini_info&limit=4&page=1&titleType=movie&genre=Action&year=2020`, options)
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
        <Text fontSize={"lg"} pb={5}>{title ? title : "Reviews"}</Text>
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} textAlign={"center"}>
              <Spinner color={"orangered"} />
        </Box>  
        </Box>
    )

    return (
        <Box mt={5} p={3}>
        <Text fontSize={"lg"} pb={5}>{title ? title : "Reviews"}</Text>
        <Box bg={"orangered"} p={3} height={"max-content"} borderRadius={10}>    
        <Grid templateColumns='repeat(1, 1fr)' templateRows='repeat(4, 1fr)' gap={5}>
                {movies?.map(m => {
                    return (
                <GridItem>
                        <Box w={"100%"} display={"flex"} justifyContent={"space-between"} alignItems={"center"} gap={2}>
                        <Image src={m.primaryImage?.url} boxSize='100px' objectFit='cover' borderRadius={"50%"} alt="movie poster" srcset="" />
                                <Box className="bubble" boxShadow={'md'} bg="black" minWidth={"200px"} maxWidth={"300px"} display={"flex"} flexDirection={"column"} textAlign={"left"} p={3} borderRadius={"10px"}>
                                <Text fontSize={"s"}  color="white" mb={5} >Alemu Sisay</Text>
                                <Text fontSize={"md"} color="white" w={"100%"}>A Good Platform!</Text>        
                        </Box>
                                
                    </Box>             
                </GridItem>
            )
        })}        
        </Grid>        
        </Box>
    </Box>
    )

}

export default Review