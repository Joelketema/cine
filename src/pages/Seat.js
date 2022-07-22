import {Box,Text,Button} from "@chakra-ui/react"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Seating from "../components/Seating"
import {Link} from "react-router-dom"

const Seat = ({ movieTitle }) => {
    
    const items = ["Price", "2D", "3D", "Location"]
    
    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Pick a Seat"} title={movieTitle} />  
            <Seating />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Button position={"relative"}  mb={10} right={0} mr={5} alignSelf={"flex-end"} mt={4} bg={"Black"} color={"white"}>
                <Link to={"/book/checkout"}>Next</Link>
            </Button>
            </Box>
        </>
    )

}

export default Seat