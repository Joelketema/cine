import { Box, Text } from "@chakra-ui/react"
import { useState, useContext } from "react"
import {TicketContext} from "../context/TicketContext"

export function SmallBox({ number, color, textColor }) {
    const [seatcolor, setSeatColor] = useState(color)
    const { seating } = useContext(TicketContext)
    const [seats, setSeats] = seating
    
    
    return (
  
        <Box cursor={color === "white" ? "pointer" : "not-allowed"} onClick={() => {
            
            if (seatcolor !== "black") {
                if (seatcolor === "white") {
                    setSeatColor("grey")
                    setSeats(prev => [...prev, number])

                }
                else if (seatcolor === "grey") {
                    setSeatColor("white")
                    setSeats(prev => prev.filter(p => {
                       return p!==number
                    }))
                }
            }
        }} bg={seatcolor} p={2} mt={2} minWidth={"35px"}  borderRadius={10} maxWidth={"35px"}>
            <Text color={textColor}>{number}</Text>
        </Box>
    )
    
}
