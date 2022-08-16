
import { Box, Text, Select, Button } from "@chakra-ui/react"
import { Link } from 'react-router-dom'

import "../assets/payment.css"
const Payment = () => {

    const data = {
        "Cinema Name": "Century Cinema",
        "Cinema hall": "Cinema 2", 
        "Movie Title": "Spider Man",
        "Showtime" :"20-6-2022 12:00PM",
        "Snacks" : "None",
        "Seats Purchased": "2",
        "Seats": "F1,F2",
        "Total" : "200 Birr"
    }

    const datas= Object.keys(data)
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
            {
                        datas.map((key,value)=> {
                            return (
                                <div class="receipt__list-row">
                                    <dt class="receipt__item">{key}</dt>
                                    <dd class="receipt__cost">{data[key]}</dd>
                                </div>
                    )
                })            
            }        

        </dl>
        </Box>
            <Box m={3} display={"flex"} flexDirection={"column"} w={{ base: "100%", md: "20%" }} gap={3}>
                <Select placeholder='Select Payment option'>
                    <option value='option1'>CBE</option>
                    <option value='option2'>TeleBirr</option>
                    <option value='option3'>Amole</option>
                </Select>
                <Button bg={"black"} color={"white"}><Link to={"/Book/finish"}>Finish</Link></Button>
            </Box>        
        </Box>
    )
    
}

export default Payment