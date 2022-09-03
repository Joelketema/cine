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
   console.log(name)
    const options = {
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${name.eachid}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`,

    };
    
    useEffect(() => {
       
        axios.request(options).then(response => {
           
            setMovie(response.data)
            setSelectedMovie(response.data.title)
           
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
            <Cast title={"Cast"} genre={"Romance"} movie={movie} />
            <Plot plot={movie.overview} />
            <Discussion title={"Discussion"}/>
        </>
    )
}

export default Ticket