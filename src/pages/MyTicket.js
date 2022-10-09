
import {Box,Text} from '@chakra-ui/react'
import { useState, useEffect,useContext } from "react"
import axios from "axios"
import Logo from "../components/Logo"
import { AuthContext } from "../context/AuthContext"
import { Link, useNavigate, Navigate } from "react-router-dom"

export default function MyTicket() {
    const [purchaseInfo,setPurchaseInfo] = useState([])
   
    useEffect(() => {
        axios.get("https://server-cproject.vercel.app/api/getTickets", {
            headers: {
      
              autherize: localStorage.getItem("TOKEN")
            }
          }).then(res=>{
              console.log(res.data.PurchaseInfo)
              setPurchaseInfo(res.data.PurchaseInfo)
            //   setUser(res.data)
        })
    },[1])
    if (localStorage.getItem("TOKEN")) {
        return (
            <Box>
                <Logo first={"G"} second={"O"} />
                <Box bg={"white"} w={"100%"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                    <Text>Your Tickets</Text>

                    <Box w={"60%"} minHeight={{ base: "300px", md: "500px" }} maxHeight={{ base: "300px", md: "500px" }} overflowY={"scroll"} >
                        {
                            purchaseInfo?.map(purchase => {
                                return (
                                    <Box borderRadius={"lg"} boxShadow={"md"} bg={"#213f87"} color={"white"} mt={5} p={3} gap={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                                        <Box display={"flex"} flexDirection={{ base: "column", md: "row" }} w={"80%"} justifyContent={"space-between"} alignItems={"center"}>
                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'flex-start'} gap={3}>
                                                <Text>Movie Name: {purchase.movieName}</Text>
                                                <Text>Cinema Name: {purchase.cinemaName}</Text>
                                                <Text>Paid Amount: {purchase.totalCash} Birr</Text>

                                            </Box>

                                            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={'flex-start'} gap={3}>
                                                <Box display={"flex"}>
                                                    <Text>Seats Purchased: </Text>

                                                    <Box>
                                                        {purchase.seats?.map(seat => {
                                                            return (
                                                                <Text>{"  " + seat + ", "}</Text>
                                                            )
                                                
                                                        })}
                                                    </Box>
                                            
                                                </Box>
                                                <Box display={"flex"}>
                                                    <Text>Snacks Purchased: </Text>

                                                    <Box>
                                                        {purchase.snacks?.map(snacks => {
                                                            return (
                                                                <Text>{"  " + snacks.snackName + ", "}</Text>
                                                            )
                                                
                                                        })}
                                                    </Box>
                                            
                                                </Box>

                                                <Box>
                                                    <Text>Purchased On: {" " + purchase.createdAt}</Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>QR CODE</Box>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
        )
    }
    else
    return (
        <Navigate to={"/"} />    
    
    )
}