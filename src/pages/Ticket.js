import Header from "../components/Header"
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from "axios";
import Hero from "../components/Hero";
import Slider from "../components/Slider"
import Plot from "../components/Plot"
import Discussion from "../components/Discussion"

const Ticket = ({ query,setMovieTitle }) => {
    
    const [movie, setMovie] = useState([{}])
    const [title, setTitle] = useState("")
    const [loading, setLoading] = useState(true);

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
            setTitle(response.data.results[0].titleText?.text)
            setMovieTitle(response.data.results[0].titleText?.text)
            setLoading(false)

        })
    }, [1])
    

    return (
        <>
            <Header icon={<ArrowCircleLeftRoundedIcon />} step={"Starting Up"} title={title}  />
            <Hero movie={movie} loading={loading} setLodaing={setLoading} />
            <Slider title={"Cast"} genre={"Romance"} />
            <Plot plot={movie.plot?.plotText} />
            <Discussion title={"Discussion"}/>
        </>
    )
}

export default Ticket