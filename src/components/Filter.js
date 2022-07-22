import { Box, Text,Grid,GridItem } from '@chakra-ui/react'


const Filter = ({items}) => {
    return (
        <Box mb={2}>
            <Grid gap={2} p={3} templateColumns={"repeat(4,1fr)"} templateRows={"repeat(2,1fr)"}>
                <GridItem colSpan={4} colStart={4}  colEnd={5} mb={5}>
                    <Box  boxShadow={"md"} bg={"black"} textAlign={'center'} p={1} borderRadius={10}>
                        <Text color={"white"}>Filter By</Text>
                    </Box>
                </GridItem>
                {
                    items.map(i => {
                        return (
                        <GridItem >
                                <Box boxShadow={"md"} bg={"black"} textAlign={'center'} p={1} borderRadius={10}>
                                    <Text color={"white"}>{i}</Text>
                                </Box>
                        </GridItem>
                      )
                  })  
                }

            </Grid>
        </Box>
    )
    
}

export default Filter;
