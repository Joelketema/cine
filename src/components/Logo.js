
import { Text, Box, Button,Switch } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const Logo = ({first,second}) => {
    return (
    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2}>
        <Link to={"/"} style={{display:"flex",padding:"3%",justifyContent:"center",alignItems:"center"}}>
            <Box bg={"orangered"} color={"white"} boxShadow='md' h={""} textAlign={"center"} p={3} borderRadius={"50%"}>
                    <Text>{first}{second}</Text>
            </Box>
            <Box><Text color="black">Movies</Text></Box>    
            {/* <Box bg={"black"} color={"white"} boxShadow='md' marginLeft={"-3"} h={"10"} textAlign={"center"} p={3} borderRadius={"50%"}>
                <Text>{second}</Text>
            </Box> */}
            </Link>
        <Switch size={"lg"} />
    </Box>
        )
}

export default Logo