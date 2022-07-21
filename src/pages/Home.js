import { Box, Flex } from "@chakra-ui/react"
import Logo from "../components/Logo"
import Slider from "../components/Slider"
import Review from "../components/Review"
const Home = () => {
    return (
        <Flex direction={"column"}>
            <Logo first={"G"} second={"O"} />
            <Slider genre={"Action"}/>
            <Slider genre={"Comedy"} title={"Fan Favorites"} />
            <Review/>
        </Flex>

    )
}

export default Home