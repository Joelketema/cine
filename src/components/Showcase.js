import { Text, Box, Button, Switch, Image } from "@chakra-ui/react"
import VisibilitySensor from 'react-visibility-sensor';
import { motion,useScroll } from "framer-motion"
import img from "../Resources/comfort.svg"
import img2 from "../Resources/security.svg"
import img3 from "../Resources/cinema.svg"
import img4 from "../Resources/pay.svg"


const items = [{
    key:1,
    image: img,
    phrase:"Buy Tickets From the Comfort of your Home!"
}, {
    key:2,
    image: img3,
    phrase:"All Your Favorite Cinemas in One Place!"
    },
    {
        key:4,
        image: img4,
        phrase:"Various Payment Options!"
    },
    {
        key:3,
        image: img2,
        phrase:"Easy,Safe and Secure!"
    },

]
const Showcase = () => {
    
    return (
        <Box mt={{ base: 5, md: "5%" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"} alignItems={"center"}
        >
        <Text mb={5} fontSize={["20px",null,"30px"]} color={"#213f87"} fontWeight={"medium"}>Welcome To GoMovies</Text>
           
                <>
                    {items.map(i => {
                        if (i.key === 2 || i.key===4) {
                            return (
                                <CustomBox key={i.key} item={i} flag />
                            )
                        }

                        else {
                            return (
                                <CustomBox key={i.key} item={i} />
                            )
                        }
                    })}
                
                </>
            
        </Box>
    )
}

function CustomBox({ flag,item }) {
    const { scrollYProgress } = useScroll();
    
    return (
        <motion.div 
        initial={{ opacity: 0, translateX: -50 }}
        whileInView={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.8 }}
            style={{ width:"50%" }}
        >
        <Box mb={10}  display={"flex"}
            justifyContent={"space-between"} alignItems={"center"}
            w={{base:"100%",md:"100%"}}
            flexDirection={flag ? { base: "column", md: "row" } : { base: "column", md: "row-reverse" }} p={{ base: 5, md: 15 }}>
            <Box>
                <Image alt={"svgs"} rounded={"full"} boxSize={{base:"150px",md:"250px"}} src={item.image} />
            </Box>

            <Box>
                    <Text fontSize={["17px", null, "23px"]} color={"#213f87"} fontWeight={"medium"}>{item.phrase}</Text>
            </Box>
        </Box>
    </motion.div>
    )
    
}

export default Showcase