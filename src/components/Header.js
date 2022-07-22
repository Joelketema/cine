
import { Text, Box, Button,Switch } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";


const Logo = ({ icon, title, step }) => {
    const history = useNavigate()
    return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2}>
       
            <Box onClick={
                () => {
                    history(-1)
                }
            } bg={"orangered"} color={"white"} boxShadow='md' h={"12"} textAlign={"center"} p={3} borderRadius={"50%"}>
                    <Text>{icon}</Text>
            </Box>    
    
            <Box bg="orangered" display={"flex"} p={2} gap={2} justifyContent={"space-between"} alignItems={"center"} borderRadius={10} w='70%' textAlign={'Right'}>
                <Text noOfLines={[1,2,3]} color={"white"}>{step ? step : "Step"}</Text>
                <Text noOfLines={[1,2,3]} color={"white"}>{title ? title : "Movie Title"}</Text>
            </Box>
    </Box>
        )
}

export default Logo