
import { useRef, useState, useEffect,useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Box, Text, Button, Image } from "@chakra-ui/react"
import { Link, useNavigate } from "react-router-dom"
import { Select } from '@chakra-ui/react'

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,useDisclosure,Tooltip
} from '@chakra-ui/react'

import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
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
  
const PickSnack= ({ goods }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { show,cName } = useContext(TicketContext)
  const [time, setTime] = show
  
  const [cinema, setCinema] = cName
  
  const[alert,setAlert] = useState(false)
    
  const [data, setData] = useState({})
  
    
    return (
    
    <Box bg={"white"} display="flex" flexDirection={{base:"column",md:"column"}}  justifyContent={"space-between"}   p={3} height={"400px"} overflowY={"scroll"}>
        {
            goods.map(m => {
                return (
            <Box display="flex"  bg={'green'} minHeight={"50%"} maxHeight={"50%"} boxShadow={"md"}  gap={6} justifyContent={"space-between"}   p={3} height={"max-content"} borderRadius={10} mt={5}>
                      <Tooltip label='Click For Info'>
                        <Image onClick={() => {
                            setData(m)
                            onOpen()
                        }} src={m.image} boxSize='70px' boxShadow={"lg"} objectFit='cover' borderRadius={"full"} alt="movie poster" srcset="" />
            </Tooltip>
            <Box bg={"white"} display={"flex"} flexDirection={"column"} gap={2} minWidth={"5%"} maxWidth={"100%"} p={3}>    
       
                                <Box display={"flex"} flexDirection={"column"} gap={3}>
                                <Select placeholder='Select Size' >
                                        <option value='option1'>Small</option>
                                        <option value='option2'>large</option>
                                        <option value='option3'>Option 3</option>
                                </Select>
                                        
                                <NumberInput defaultValue={0} min={0} max={5}>
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
                                    </NumberInputStepper>
                                </NumberInput>
                               
                            </Box>   
                            
                            <Box>
                                <Button onClick={
                                    () => {
                                     console.log("bought")
                                    }} mb={2} mr={2} bg={"black"} color={"white"}>Buy</Button> 
                        </Box>


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
    const {term} = useContext(AuthContext)
    const [accept, setAccept] = term


 
  
  const navigate = useNavigate()

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
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque fugiat tempora quae nemo corrupti. Iste, ea! Sit, ea ducimus. Nihil.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque fugiat tempora quae nemo corrupti. Iste, ea! Sit, ea ducimus. Nihil.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque fugiat tempora quae nemo corrupti. Iste, ea! Sit, ea ducimus. Nihil.

              </AlertDialogBody>
  
              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => {
                  setAlert(false)
                  setAccept(false)
                }}>
                  Cancel
                </Button>
                <Button colorScheme='green' onClick={() => {
                  setAccept(true)
                  navigate("/Book/seat")

                }} ml={3}>
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
export default PickSnack