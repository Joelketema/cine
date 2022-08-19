
import Logo from "../components/Logo"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import {useState,useEffect,useContext} from "react"
import { Box, Text, Spinner } from "@chakra-ui/react"
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { CheckCircle } from "@mui/icons-material";
import {TicketContext} from "../context/TicketContext"
const Finish = ({ movieTitle }) => {
    
    const [load,setLoad] = useState(true)
    var [loading, setLoading] = useState(0)
    const { seating, snackArray, cName } = useContext(TicketContext)
    const [seats, setSeats] = seating
    const [snacks, setSnacks] = snackArray
    const [cinema,setCinema]= cName


    useEffect(() => {
    setSeats([])
    setSnacks([])
    setCinema("")
    setInterval(() => {
        setLoading(loading++)
    },100)
    }, [1])

    if (load)
    {
        if(loading>100) setLoad(false)
        return (
            <>
            <Logo first={"G"} second={"O"} />
            <Box  display={"flex"} h={"80vh"} justifyContent={"center"} p={5} mt={0} alignItems={"center"}>
                <CircularProgress value={loading} color='orangered' size={'100px'}>
                    <CircularProgressLabel>{loading}%</CircularProgressLabel>
                </CircularProgress>
                </Box>
            </>
        )
        }
    
    return (
        <>
            <Logo first={"G"} second={"O"} />
            <Box h={"80vh"} display={"flex"}gap={5} flexDirection={"column"} justifyContent={"center"}  p={5} mt={0}  alignItems={"center"}>
                <CheckCircle sx={{color:"green",fontSize:"70px"}} />
                <Text fontSize={"large"}>Your Purchase was Successful!</Text>
            </Box>
         
        </>
    )

}

export default Finish