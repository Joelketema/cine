import { Box, Text,Avatar,Button,Tooltip} from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
} from '@chakra-ui/react'
  
import { Link,useNavigate } from "react-router-dom"
import {useState,useEffect,useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import axios from "axios"

const Logo = ({ first, second }) => {
    const navigate = useNavigate()
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure 
    

    const fetchProfile = () => {
         navigate("/profile")   
    }
    
    useEffect(() => {
        if(localStorage.getItem("TOKEN")) setAuth(true)
    }, [1])

    const handleLogout = () => {
        localStorage.removeItem("TOKEN")
        setAuth(false)
        navigate("/")
    }
    
    
    return (
        <Box bgGradient='linear(290deg, rgba(0, 0, 0, 1) 0%, rgba(33, 63, 135, 1) 51%, rgba(33, 63, 135, 1) 100%)'
            display={"flex"} justifyContent={"space-between"} alignItems={"center"} p={2} mb={5}>
        <Link to={"/"} style={{display:"flex",padding:"1%",justifyContent:"center",alignItems:"center"}}>
            <Box bg={"black"}  color={"white"} boxShadow={'lg'} h={""} textAlign={"center"} p={3} borderRadius={"50%"}>
                    <Text>{first}{second}</Text>
            </Box>
            <Box><Text fontWeight={"medium"} color="white">Movies</Text></Box>    
            {/* <Box bg={"black"} color={"white"} boxShadow='md' marginLeft={"-3"} h={"10"} textAlign={"center"} p={3} borderRadius={"50%"}>
                <Text>{second}</Text>
            </Box> */}
            </Link>
        <Box display={"flex"} justifyContent={{base:"space-around",md:"space-between"}} alignItems={"center"} p={5}  w={auth ? {base:"15%",md:"10%"} : {base:"80%",md:"20%"}}>
                {
                    !auth ? <>
                        <Link to={"/auth"}>
                            <Button variant='outline' color={"white"} bg={"#213f87"} _hover={{ backgroundColor: "#213f87" }}>Sign Up</Button>
                        </Link>
                        <Link to={"/auth"}>
                            <Button variant='outline' color={"white"} bg={"#213f87"} _hover={{ backgroundColor: "#213f87" }}>Login</Button>
                        </Link>
                    </>
                        
                        :
                        <>
                          
                    <Menu>
                        <Tooltip hasArrow label='your profile'>
                        <MenuButton >
                                <Avatar />
                        </MenuButton>
                        </Tooltip>

                        <MenuList>
                            <MenuItem><Link to={"/"}>Home</Link></MenuItem>
                            <MenuItem><Link to={"/tickets"}> My Tickets </Link></MenuItem>
                            <MenuItem onClick={fetchProfile}>My Profile</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>

                        </>
               }

        </Box>
            

    </Box>
        )
}

export default Logo