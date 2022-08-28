import {Box,Text} from "@chakra-ui/react"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Payment from "../components/Payment"
import { Link, useNavigate, Navigate } from "react-router-dom"

const Checkout = ({ movieTitle }) => {
    
    
    if (localStorage.getItem("TOKEN")) {
        return (
            <>
                <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Checkout"} />
                <Payment />
            
            </>
        )
    }
    else
    return (
        <Navigate to={"/"} />    
    
    )

}

export default Checkout