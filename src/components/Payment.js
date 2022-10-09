
import { Box, Text, Select, Button } from "@chakra-ui/react"
import { Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useState, useEffect,useRef } from "react"
import toast from "react-hot-toast"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Tooltip
} from '@chakra-ui/react'



import "../assets/payment.css"

const Payment = () => {

    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [cancel,setCancel] = useState(false)

    useEffect(() => {
        axios.get("https://server-cproject.vercel.app/api/getCart", {
            headers: {
              autherize: localStorage.getItem("TOKEN")
            }
        }).then(res => {
            console.log(res.data) 
              setData(res.data)
          })
        
    }, [1])
    
    const handleRequest = () => {
        axios.post("https://server-cproject.vercel.app/api/addTicket",data,{
            headers: {
              autherize: localStorage.getItem("TOKEN")
            }
        }).then(res => {
            navigate("/Book/Finish")
            console.log(res)
        })
    }


    // const data = {
    //     "Cinema Name": "Century Cinema",
    //     "Cinema hall": "Cinema 2",
    //     "Movie Title": "Spider Man",
    //     "Showtime" :"20-6-2022 12:00PM",
    //     "Snacks" : "None",
    //     "Seats Purchased": "2",
    //     "Seats": "F1,F2",
    //     "Total" : "200 Birr"
    // }

    // const datas= Object.keys(data)
    if (data !== null) {
        return (
            <Box p={5} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                <Box class="receipt" w={{ base: "100%", md: "50%" }}>
                    <Text class="receipt__header">
                        <Text class="receipt__title" color={"black"} fontSize={"xl"}>
                            Purchase Summary
                        </Text>
                        <Text class="receipt__date">{new Date().getDate() + "/" + "" + new Date().getMonth() + "/" + new Date().getFullYear()}</Text>
                    </Text>
                
                    <dl class="receipt__list">
      
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Movie Title</dt>
                            <dd class="receipt__cost">{data.movieName}</dd>
             
                        </div>
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Cinema Name</dt>
                            <dd class="receipt__cost">{data.cinemaName}</dd>
                        </div>
                    
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Show Time</dt>
                            <dd class="receipt__cost">{data.showtime}</dd>
                            <Link to={"/Book"}>Change Showtime</Link>
                        </div>
                    
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Seats</dt>
                            <dd class="receipt__cost">
                                {(data.seats)?.map(s => {
                                    return (
                                        <Text>{s},</Text>
                                    )
                                })}
                            </dd>
                            <Link to={"/Book/Seat"}>Change Seat</Link>
                        </div>
                    
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Snacks</dt>
                            <dd class="receipt__cost">
                                
                                {(data.snacks)?.map(s => {
          
                                    return (
                                        <Box display={"flex"} p={3} borderRadius={"md"} boxShadow={"md"} justifyContent={"center"} alignItems={"center"} gap={5}>
                                            <Text>{s.snackName}</Text>
                                            <Text>{s.snackProp}</Text>
                                            <Text>{s.amount}</Text>
                                        </Box>
                                    )
                                })}
                            </dd>
                        
                        </div>
                    
                        <div class="receipt__list-row">
                            <dt class="receipt__item">Total</dt>
                            <dd class="receipt__cost">250.99 Birr</dd>
                        </div>
        
                    </dl>
                </Box>
                <Box m={3} display={"flex"} flexDirection={"column"} w={{ base: "100%", md: "20%" }} gap={3}>
                    <Select placeholder='Select Payment option'>
                        <option value='option1'>CBE</option>
                        <option value='option2'>TeleBirr</option>
                        <option value='option3'>Amole</option>
                    </Select>
                    <Box display={"flex"} mt={"5"} gap={5} width={"100%"}>

                        <Button bg={"black"} color={"white"} minW={"50%"} onClick={handleRequest}>Finish</Button>
                        <Button bg={"red"} color={"white"} minW={"50%"} onClick={() => setCancel(true)}>Cancel</Button>
                    </Box>
                </Box>
                {cancel && <AlertDialogExample cancel={cancel} setCancel={setCancel} />}
            </Box>
        )
    }
    else {
        return (
          
            <Box p={5} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                <Text>Your Ticket has Expired! Please Try Again!</Text>
            </Box>
                
                
        )
    }
}

function AlertDialogExample({ cancel,setCancel }) {
    
    const cancelRef = useRef()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleCancel = () => {
        axios.post("https://server-cproject.vercel.app/api/removeCart",{
            headers: {
              autherize: localStorage.getItem("TOKEN")
            }
        }).then(res => {
            toast.success("Ticket Cancelled!")
            navigate("/")
            console.log(res)
        }).catch(e => {
            toast.error("Sorry was unable to perform task!")
            console.log(e)
        })
    }


    const navigate = useNavigate()

 

    return (
      <>

        <AlertDialog
          isOpen={cancel}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
               Are You Sure you want to Cancel your ticket?
              </AlertDialogHeader>
  
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => {
                  setCancel(false)
                  
                }}>
                  No
                </Button>
                <Button colorScheme='green' onClick={handleCancel} ml={3}>
                  Yes
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}
  

export default Payment