
import { Box, Text,Image,Button,Input } from "@chakra-ui/react"
import { useState, useEffect,useContext } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
// import "../assets/review.css"
import { Spinner } from '@chakra-ui/react'
import {Link} from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import toast from 'react-hot-toast'
const Review = ({title}) => {

    const [movies, setMovies] = useState([{}])
    const [review,setReview] = useState("")
    const [loading, setLoading] = useState(true)
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    const handleReview = () => {
        review !=="" ? toast.success("Your Review will be Posted after Sometime. Thank You😊")
            : toast.error("Please Provide A review")
        
        setReview("")
    }

    const handleReviewChange = (e) => setReview(e.target.value)

    
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
    

    return (
        <Box
            mt={{ base: 5, md: "5%" }}
            display={"flex"}
            flexDirection= "column"
            justifyContent={"center"} alignItems={"center"}
            w={"100%"}
         
        >
               
         <Text fontSize={["17px",null,"23px"]} color={"#213f87"} fontWeight={"medium"}> {"Reviews"}</Text>
            <Box display={"flex"}
                flexDirection={{base:"column",md:"row"}}
                w={"90%"}
                mb={5}
            justifyContent={"space-around"} alignItems={"center"}>
            {loading && <Spinner color={"#213f87"} />}
                {!loading &&  
                <><Reviews movies={movies} />
                <Reviews movies={movies} /></>
                }
            </Box>

            {
                !auth ?
            <Box>
                <Link to={"/auth"}>
                    <Button variant='outline' color={"white"} bg={"#213f87"} _hover={{ backgroundColor: "#213f87" }}>Sign Up to Leave A review!</Button>
                </Link>
                    </Box> :
                    
                <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={15}>
                    <Input variant='outline' value={review} onChange={handleReviewChange} placeholder='Write Your Review of the Platform!' mt={5} />
                    <Button onClick={handleReview} bg={"black"} _hover={{backgroundColor:"black"}} color="white" variant="solid">Post My Review</Button> 
                </Box>  
            }

    </Box>
    )

}

function Reviews({movies}){
    return (
        <>
     
            <Box
        bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)'
                p={3} height={"max-content"} borderRadius={10}>    
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
            </>
    )
}
export default Review