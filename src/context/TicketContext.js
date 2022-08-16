import { useState, createContext } from "react"

export const TicketContext = createContext()

export const TicketProvider = (props) => {

    const [ticket, setTicket] = useState({
        movieName: "",
        showtime:null,
        cinemaName:"",
        seats:[],
        snacks: [],
        purshedOn: null,
        
    })   


    return (
        <TicketContext.Provider value={{ item: [ticket, setTicket]}}>
            {props.children}
        </TicketContext.Provider> 
    )
}

