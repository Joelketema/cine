import {Box,Text} from "@chakra-ui/react"
import Header from "../components/Header"
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import Filter from "../components/Filter";
import PickTime from "../components/PickTime";
import { AuthContext } from "../context/AuthContext"
import { useState, useEffect, useContext} from 'react'
import {useNavigate,Navigate} from "react-router-dom"

const Book = ({  }) => {
    
    const {secure} = useContext(AuthContext)
    const [auth, setAuth] = secure
    const navigate = useNavigate()

    const items = ["Price", "2D", "3D", "Location"]
    
    
    if (localStorage.getItem("TOKEN")) {
        return (
            <>
                <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Pick Show Time"} />
                <Filter items={items} />
                <PickTime />

            </>
        )
    }
    else
        return (
            <Navigate to={"/"} />    
        
        )
    

}

export default Book