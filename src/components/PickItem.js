
import { useRef, useState, useEffect,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Box, Text, Button, Image } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Tooltip
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

import { TicketContext } from '../context/TicketContext' 
  
const PickItem = ({ goods }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { show,cName } = useContext(TicketContext)
  const [time, setTime] = show
  
  const [cinema, setCinema] = cName
  
  const[alert,setAlert] = useState(false)
    
  const [data, setData] = useState({})
  
    
    return (
    <Box bg={"white"} display="flex" flexDirection={{base:"column",md:"row"}} flexWrap={"wrap"} justifyContent={"space-between"}   p={3} height={"max-content"}>
        {
            goods.map(m => {
                return (
            <Box display="flex" gap={6} justifyContent={"space-between"}   p={3} height={"max-content"} borderRadius={10} mt={5}>
                      <Tooltip label='Click For Info'>
                        <Image onClick={() => {
                            setData(m)
                            onOpen()
                        }} src={m.image} boxSize='70px' boxShadow={"lg"} objectFit='cover' borderRadius={"full"} alt="movie poster" srcset="" />
            </Tooltip>
            <Box bg={"white"} minWidth={"5%"} maxWidth={"100%"} p={3} gap={5}>    
            {
                            goods[0].showtime?.map(s => {
                                return (
                                  <Button onClick={
                                    () => {
                                      setAlert(true)
                                      setTime(s)
                                      setCinema(m.Name)
                                   
                                    }
                                    } mb={2} mr={2} bg={"black"} color={"white"}>{s}</Button> 
                                   
                       )
                   })         
            }

            </Box>
        </Box> 
                )
            })
            }
        {alert ? <AlertDialogExample cinema={cinema} time={time} alert= {alert} setAlert={setAlert} onOpen={onOpen} onClose={onClose} /> : null}
        {isOpen && <BasicUsage data={data} isOpen = {isOpen} onOpen={onOpen} onClose={onClose} />}
       
       </Box>
    )
}

function AlertDialogExample({cinema,time,alert,setAlert, onOpen, onClose }) {
    
    const cancelRef = useRef()
  const { term } = useContext(AuthContext)
  const { seatno } = useContext(TicketContext)
    const[seatnumber,setSeatNumber] = seatno
    const [accept, setAccept] = term


    const navigate = useNavigate()

    const handleRequest = () => {
        
            if (cinema !== ""&& time!=="") {
  
                axios.patch('http://localhost:3001/api/addToCart', { "cinemaName": cinema , "showtime" :time }
                    , {
                        headers: {
                
                            autherize: localStorage.getItem("TOKEN")
                        }
                  }).then(res => {
                    axios.get("http://localhost:3001/api/getSeat",{
                      headers: {
                        autherize: localStorage.getItem("TOKEN")
                      }
                    }).then(response => {
                        console.log(response)
                      setSeatNumber(response.data)
                      setAccept(true)
                      navigate("/Book/seat")
                  })
                    

                    }).catch(e => console.log(e))
            }
        
    }
  

    return (
      <>

        <AlertDialog
          isOpen={alert}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize='lg' fontWeight='bold'>
               Term and Conditions
              </AlertDialogHeader>
  
              <AlertDialogBody>
              1. Food Beverages are not allowed inside the auditorium as per the state government guidelines.<br/>
              2. Tickets are compulsory for children of 3 years &amp; above.<br/>
              3. After Successful Purchase tickets are <strong> NONREFUNDABLE </strong>.<br/>
              4. Items like laptops, cameras, knives, lighters, matchboxes, cigarettes, firearms, and all types of inflammable objects are strictly prohibited.<br/>
              5. Items like carry-bags, eatables, helmets, handbags are not allowed inside the theatres and are strictly prohibited. Kindly deposit at the baggage counter of the mall/cinema.<br/>
              6. For 3D movies, ticket price includes charges towards the usage of 3D glasses.<br/>
              7. The seat Layout page for PVR Cinemas is for representational purposes only and the actual seat layout might vary.<br/>
              8. Outside food &amp; beverages are not allowed in the cinema premises.

              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => {
                  setAlert(false)
                  setAccept(false)
                }}>
                  Cancel
                </Button>
                <Button colorScheme='green' onClick={handleRequest} ml={3}>
                  Accept
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
    )
}
  
function BasicUsage({isOpen, onOpen, onClose,data }) {

    return (
      <>

  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
                    <ModalHeader>{data.Name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam rem eligendi culpa, error debitis aliquam architecto odit quis,
                        fugiat temporibus fuga? Cumque totam veniam rerum nobis perferendis laborum nisi cupiditate.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
    
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }
export default PickItem