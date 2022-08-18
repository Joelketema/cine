import { Box, Text } from "@chakra-ui/react"
import { SmallBox } from "./SmallBox";
import { useState, useContext } from "react"
import {TicketContext} from "../context/TicketContext"

import { Divider } from '@chakra-ui/react'

const seatnumber = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"]

const SeatingLayout = () => {
    const { seating } = useContext(TicketContext)
    const [seats, setSeats] = seating
    

    return (
        <Box p={5} display={"flex"} w={"100%"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'} gap={"5"} bg={'green.100'}>
                
            <Box display={"flex"} w={"40%"} flexDirection={"column"} justifyContent={"center"} alignItems={'center'}>    
                <Available/>
                <Box p={3} display={"flex"} w={"100%"} justifyContent={"space-around"}>
                    <Box>
                        {
                            seatnumber.map(s => {
                                return (
                                    <Box display={"flex"}  gap={5}>
                                        <SmallBox number={s} color={"white"} textColor={"black"} />
                                        <SmallBox number={s} color={"white"} textColor={"black"}/>
                                        <SmallBox number={s}  color={"black"} textColor={"white"}/>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Divider orientation={"vertical"} />
                    <Box>
                        {
                            seatnumber.map(s => {
                                return (
                                    <Box display={"flex"} gap={5}>
                                        <SmallBox number={s} color={"white"} textColor={"black"} />
                                        <SmallBox number={s} color={"white"} textColor={"black"}/>
                                        <SmallBox number={s} color={"black"} textColor={"white"}/>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
                <Box height={"20px"} textAlign={'center'} mt={5} width={"100%"} bg={"white"} boxShadow={"0 3px 10px 2px"} transform={"rotateX(-30deg)  scale(1.1)"}>
                    <Text>Screen</Text>
            </Box>
            </Box>
            <Box>
                <Text>you have chosen seats: {seats}</Text>
        </Box>
        </Box>
    )
    
}

function Available() {
    return (
        <Box display={"flex"}  w={"100%"} justifyContent={"space-around"} alignItems={"center"}>
            <Box display={"flex"} justifyContent={"center"} alignItems={'center'} textAlign={"center"} gap={3}>
                <SmallBox number="" color={"black"} textColor={"white"}/>
                <Text>Taken Seat</Text>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={'center'} textAlign={"center"} gap={3}>
                <SmallBox number="" color={"white"} textColor={"white"}/>
                <Text>Available</Text>
            </Box>

            <Box display={"flex"} justifyContent={"center"} alignItems={'center'} textAlign={"center"} gap={3}>
                <SmallBox number="" color={"grey"} textColor={"white"}/>
                <Text>Picked Seat</Text>
            </Box>
        </Box>
    )
}

export default SeatingLayout;