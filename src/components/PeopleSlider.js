
import { Box, Text,Image } from "@chakra-ui/react"
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


const PeopleSlider = ({title,movie}) => {
    const [movies, setMovies] = useState([{}])
    
    
    return (
        <Box flexDirection={"column"} mt={8} p={3}>
        <Text fontSize={"lg"} pb={5}>{title? title : "Now Showing"}</Text>
        <Box bg={"orangered"} p={3} borderRadius={10}>    
            <Splide
                options={{
                perPage: 4,
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
                            <Link to={`/${m.titleText?.text}`}>
                            <Box>
                                <Image src={m.primaryImage?.url} boxSize='100px' objectFit='cover' borderRadius={10} alt="movie poster" srcset="" />
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

export default PeopleSlider