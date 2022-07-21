import {Box,Text} from "@chakra-ui/react"

const Plot = ({plot}) => {
    return (
        <Box flexDirection={"column"} mt={8} p={3}>
        <Text fontSize={"lg"} pb={5}>Plot</Text>
        <Box bg={"orangered"} p={3} borderRadius={10} color="white">
            <Text>{plot?.plainText}</Text>
        </Box>
        </Box>
    )
}

export default Plot