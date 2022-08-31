import Header from "../components/Header"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { useParams } from "react-router-dom";
import { useState, useEffect,useContext } from 'react'
import axios from "axios";
import Hero from "../components/Hero";
import Slider from "../components/Slider"
import Plot from "../components/Plot"
import Cast from "../components/Cast"
import Discussion from "../components/Discussion"
import { AuthContext } from "../context/AuthContext";
import { TicketContext } from "../context/TicketContext";
import toast from "react-hot-toast"

const Ticket = ({ query}) => {
    
    const [movie, setMovie] = useState([{}])
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(true);
    const {movietitle} = useContext(AuthContext)
    const [selectedmovie, setSelectedMovie] = movietitle
    const { item } = useContext(TicketContext)
    const [ticket, setTicket] = item
    
    

 
    const name = useParams()
   
    const options = {
        method: 'GET',
        url: `https://moviesdatabase.p.rapidapi.com/titles/search/title/${name.eachid}`,
        params: {info: 'base_info', limit: '10', page: '1', titleType: 'movie', exact: 'true'},
        headers: {
          'X-RapidAPI-Key': '30f8f07841msh32c3146f1e35d96p1df6c8jsn66be063d993c',
          'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    useEffect(() => {
       
        axios.request(options).then(response => {
            setMovie(response.data.results[0])
            setSelectedMovie(response.data.results[0].titleText?.text)
           
            setLoading(false)

        }).catch(e => {
            console.log(e)
            toast.error(e.message)
        })
    }, [1])
    

    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Starting Up"}   />
            <Hero movie={movie} loading={loading} setLodaing={setLoading} />
            <Cast title={"Cast"} genre={"Romance"} />
            <Plot plot={movie.plot?.plotText} />
            <Discussion title={"Discussion"}/>
        </>
    )
}

export default Ticket