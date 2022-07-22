

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from "./components/Footer"
import Ticket from "./pages/Ticket"
import Book from "./pages/Book"
import Snack from "./pages/Snack"
import Seat from "./pages/Seat"
import Checkout from "./pages/Checkout"
import Finish from "./pages/Finish"

import {useState} from 'react'



function App() {

  const [movieTitle,setMovieTitle] = useState("")

  return (
    <>
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Ticket/:eachid" element={<Ticket setMovieTitle={setMovieTitle} />} />
        <Route path="/Book" element={<Book movieTitle={movieTitle} />} />
        <Route path="/Book/snacks" element={<Snack movieTitle={movieTitle} />} />
        <Route path="/Book/seat" element={<Seat movieTitle={movieTitle} />} />
        <Route path="/Book/checkout" element={<Checkout movieTitle={movieTitle} />} />
        <Route path="/Book/finish" element={<Finish movieTitle={movieTitle} />} />
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
