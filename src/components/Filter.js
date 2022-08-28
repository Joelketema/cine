import { Box, Text,Button,Input} from '@chakra-ui/react'
import { Splide, SplideSlide} from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Tooltip
} from '@chakra-ui/react'

const count = [1,2,3,4,5,6,7]

const Filter = ({items}) => {
    return (
        <Box p={2} w={"100%"} display={"flex"} boxShadow={"lg"} rounded={"md"} bg={"white"} justifyContent={"space-between"} alignItems={"center"}>
            <Calander />
            <Sort/>
           
        </Box>
    )
    
}

function Calander () {
    return (
        <>
        
        <Box w={"25%"} display={{base:"none",md:"block"}}>
    
            <Splide
             options={{
                perPage:4,  
                     rewind:true,
                        width: "100vw",
                        height: 'fit-content',
                        gap: '1rem',
                     arrows:false
             
            }} 
            >
                    { count.map(c=>{
                        return (                            
                <SplideSlide className='ss'>
                                <Button display={"flex"} bg={c === 1 ? "black" : "white"}color={c === 1 ? "white" : "black"} flexDirection={"column"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text>Mon</Text>
                        <Text>10</Text>
                        <Text>Aug</Text>
                    </Button>
                </SplideSlide>
                        )
                    })}
            </Splide>

            </Box>
            <Box display={{base:"block",md:"none"}}>
                <Input
                placeHolder="Select Date Of Screening"
                size="md"
                backgroundColor="#ffffff"
                type="date"
                />
            </Box>
            </>
        
    )
}

function Sort() {
    return (
        <>
 <Menu>
    <Tooltip hasArrow label='Click to Filter'>
    <MenuButton as={Button} bg={"black"} color={"white"} _hover={{backgroundColor:"black"}} rightIcon={<ArrowDropDownRoundedIcon/>}>
    Filter
  </MenuButton>
    </Tooltip>

    <MenuList>
        <MenuItem>3D Movies</MenuItem>
        <MenuItem>2D Movies</MenuItem>
    </MenuList>
</Menu>
       
        </>
    )
}
export default Filter;
