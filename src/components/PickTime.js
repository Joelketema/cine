
import {Box,Text,Button,Input} from "@chakra-ui/react"
import PickItem from "./PickItem"
const PickTime = () => {

    const goods = [{
        "image": "https://cinema.gastmall.net/views/images/logo@2x.png",
        "showtime" :["12PM","3PM","3AM","1:30PM","2PM"]
    },
    {
        "image": "data:image/png;base64,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",
        "showtime" :["12PM","3PM","3AM","1:30PM","2PM"]
        },
    {
        "image": "data:image/jpeg;base64,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",
        "showtime" :["12PM","3PM","3AM","1:30PM","2PM"]
        },
    
    ]
    return (
        <>
            <Input
            placeHolder="Select Date Of Screening"
            size="md"
            backgroundColor="#ffffff"
            type="date"
            />
            <PickItem goods={goods} />
        </>
    )
    
}

export default PickTime