import { Box, Text, Button } from "@chakra-ui/react"
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure,Tooltip
  } from '@chakra-ui/react'

import Snack from "./Snack"

import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Seating from "../components/Seating"
import {Link} from "react-router-dom"
import { useContext,useEffect } from "react"
import { TicketContext } from "../context/TicketContext"
import { AuthContext } from "../context/AuthContext"

const Seat = ({ }) => {

  const {term} = useContext(AuthContext)
  const [accept, setAccept] = term
  const { item,cName,show } = useContext(TicketContext)
  const [ticket, setTicket] = item
  const [cinema, setCinema] = cName
  const [time, setTime] = show

  useEffect(() => {
    setTime(time)
    setCinema(cinema)
},[1])

    const items = ["Price", "2D", "3D", "Location"]
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Pick a Seat"}  />  
            <Seating />
            <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            <Button position={"relative"}onClick={onOpen}  mb={10} right={0} mr={5} alignSelf={"flex-end"} mt={4} bg={"Black"} color={"white"}>
                Next
                </Button>
                {isOpen && <BasicUsage  isOpen = {isOpen} onOpen={onOpen} onClose={onClose} />}
            </Box>
        </>
    )

}

function BasicUsage({isOpen, onOpen, onClose,data }) {

    return (
      <>

  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
                    {/* <ModalHeader>{data.Name}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam rem eligendi culpa, error debitis aliquam architecto odit quis,
                        fugiat temporibus fuga? Cumque totam veniam rerum nobis perferendis laborum nisi cupiditate.
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
    
            </ModalFooter> */}
                <Snack/>
          </ModalContent>
        </Modal>
      </>
    )
  }

export default Seat