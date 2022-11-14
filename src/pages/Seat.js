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
import axios from "axios"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Seating from "../components/Seating"
import SeatingLayout from "../components/SeatingLayout"
import {Link,useNavigate,Navigate} from "react-router-dom"
import { useContext,useEffect,useState } from "react"
import { TicketContext } from "../context/TicketContext"
import { AuthContext } from "../context/AuthContext"
import toast from "react-hot-toast"

const Seat = ({ }) => {
  const [open,setOpen] = useState(false)
  const {term} = useContext(AuthContext)
  const [accept, setAccept] = term
  const { item,cName,show,seating } = useContext(TicketContext)
  const [ticket, setTicket] = item
  const [cinema, setCinema] = cName
  const [time, setTime] = show
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [seats, setSeats] = seating

  const handleRequest = () => {
    if (seats.length > 0) {
      axios.post("https://server-cproject.vercel.app/api/addToCartSeats", seats, {
        headers: {
  
          autherize: localStorage.getItem("TOKEN")
        }
      }).then(res => {
        setOpen(true)
        console.log(res)
      })
    }
    else {
      toast.error("Please Select Seats!")
      console.log("empty")
    }
  }
  



    const items = ["Price", "2D", "3D", "Location"]
  if (localStorage.getItem("TOKEN")) {
    return (
      <>
        <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Pick a Seat"} />
        <SeatingLayout />
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
          <Button position={"relative"} onClick={handleRequest} mb={10} right={0} mr={5} alignSelf={"flex-end"} mt={4} bg={"Black"} color={"white"}>
            Next
          </Button>
          {open && <BasicUsage isOpen={open} onOpen={onOpen} onClose={onClose} />}
        </Box>
      </>
    )
  }
  else
  return (
      <Navigate to={"/"} />    
  
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