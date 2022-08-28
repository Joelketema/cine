import { Box, Flex } from "@chakra-ui/react"
import Logo from "../components/Logo"
import Slider from "../components/Slider"
import BigSlider from "../components/BigSlider"
import Review from "../components/Review"
import Showcase from "../components/Showcase"
import toast, { Toaster } from 'react-hot-toast'
const Home = () => {
    return (
        <Flex direction={"column"}>
            <Logo first={"G"} second={"O"} />
            <BigSlider genre={"Action"} />
            <Toaster
                toastOptions={{
                    success: {
                        style: {
                            background: 'green',
                            color:"white"
                        },
                      },
                      error: {
                        style: {
                              background: 'red',
                              color:"white"
                        },
                      },
                        }} />
            <Showcase />
            <Slider title={"Coming Soon!"} genre={"Romance"} />
            <Review/>
        </Flex>

    )
}

export default Home