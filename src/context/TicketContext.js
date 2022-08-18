import { useState, createContext } from "react"

export const TicketContext = createContext()

export const TicketProvider = (props) => {

    const [ticket, setTicket] = useState([])   
    const [time, setTime] = useState("")   
    const [cinema, setCinema] = useState("")   
    const [seats, setSeats] = useState([])   
    const [snacks, setSnacks] = useState([]) 
    
 
    
    // movieName: "",
    // showtime:null,
    // cinemaName:"",
    // seats:[],
    // snacks: [],
    // purshedOn: null,

    return (
        <TicketContext.Provider value={{ item: [ticket, setTicket],show:[time,setTime], seating: [seats, setSeats], cName: [cinema, setCinema], snackArray: [snacks, setSnacks] }}>
            {props.children}
        </TicketContext.Provider> 
    )
}

