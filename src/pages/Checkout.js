import {Box,Text} from "@chakra-ui/react"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Payment from "../components/Payment"

const Checkout = ({ movieTitle }) => {
    
    
    
    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Checkout"} title={movieTitle} />
            <Payment/>
            
        </>
    )

}

export default Checkout