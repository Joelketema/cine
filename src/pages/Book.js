import {Box,Text} from "@chakra-ui/react"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Filter from "../components/Filter";
import PickTime from "../components/PickTime";

const Book = ({ movieTitle }) => {
    
    const items = ["Price", "2D", "3D", "Location"]
    
    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Pick Show Time"} title={movieTitle} />  
            <Filter items={items} />
            <PickTime/>

        </>
    )

}

export default Book