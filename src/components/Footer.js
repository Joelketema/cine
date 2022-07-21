
import { Box,Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box p={5} mt={10} textAlign={"center"}>
            <Text>Made by Black Techonologies @ {new Date().getFullYear()}</Text>
        </Box>
        
    )
}

export default Footer;