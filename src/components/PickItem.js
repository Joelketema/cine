
import { Box, Text, Button,Image} from "@chakra-ui/react"
import { Link } from "react-router-dom"

const PickItem = ({ goods }) => {
   
    return (
    <>
        {
            goods.map(m => {
                return (
            <Box display="flex" gap={6} justifyContent={"space-between"}  bg={"orangered"} p={3} height={"max-content"} borderRadius={10} mt={5}>
            <Image src={m.image} boxSize='70px' boxShadow={"lg"} objectFit='cover' borderRadius={"full"} alt="movie poster" srcset=""/>
            
            <Box bg={"white"} minWidth={"5%"} maxWidth={"100%"} p={3} gap={5}>    
            {
                            goods[0].showtime?.map(s => {
                                return (
                                   <Link to={"/book/snacks"}><Button mb={2} mr={2} bg={"black"} color={"white"}>{s}</Button></Link> 
                       )
                   })         
            }

            </Box>
        </Box> 
                )
            })
        }
       
       </>
    )
}

export default PickItem