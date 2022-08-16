import {Box,Text} from "@chakra-ui/react"

const Plot = ({plot}) => {
    return (
        <Box   mt={8} p={3} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={5}>
        <Text fontSize={["17px",null,"23px"]} color={"#213f87"} fontWeight={"medium"} pb={5}>Plot</Text>
        <Box w={"70%"} bg={"white"} p={3} borderRadius={10} color="white">
            <Text color={"#213f87"}>{plot?.plainText}</Text>
        </Box>
        </Box>
    )
}

export default Plot