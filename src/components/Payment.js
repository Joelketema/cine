
import { Box, Text, Select, Button } from "@chakra-ui/react"
import { Link,useNavigate} from 'react-router-dom'
import axios from "axios"
import { useState, useEffect } from "react"


import "../assets/payment.css"

const Payment = () => {

    const [data,setData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3001/api/getCart", {
            headers: {
              autherize: localStorage.getItem("TOKEN")
            }
        }).then(res => {
            console.log(res.data)
              setData(res.data)
          })
        
    }, [1])
    
    const handleRequest = () => {
        axios.post("http://localhost:3001/api/addTicket",data,{
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
    return (
        <Box p={5} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
        <Box class="receipt" w={{base:"100%",md:"50%"}}>
        <Text class="receipt__header">
            <Text class="receipt__title" color={"black"} fontSize={"xl"}>
            Purchase Summary
        </Text>  
                    <Text class="receipt__date">{ new Date().getDate() + "/" + "" + new Date().getMonth() + "/" + new Date().getFullYear()}</Text>
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
                    </div>
                    
                    <div class="receipt__list-row">
                        <dt class="receipt__item">Snacks</dt>
                        <dd class="receipt__cost">
                            {(data.snacks)?.map(s => {
                                return (
                                    <Box display={"flex"} p={3}  borderRadius={"md"} boxShadow={"md"} justifyContent={"center"} alignItems={"center"} gap={5}>
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
                <Button bg={"black"} color={"white"} onClick={handleRequest}>Finish</Button>
            </Box>        
        </Box>
    )
    
}

export default Payment