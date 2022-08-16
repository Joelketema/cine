

import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from "./components/Footer"
import Ticket from "./pages/Ticket"
import Book from "./pages/Book"
import Snack from "./pages/Snack"
import Seat from "./pages/Seat"
import Checkout from "./pages/Checkout"
import Finish from "./pages/Finish"
import AuthForm from "./pages/AuthForm"
import VerifyPage from "./pages/VerifyPage"
import { AuthProvider } from "./context/AuthContext"
import { TicketProvider } from "./context/TicketContext"
import {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast'

import "./App.css"

function App() {

  const [movieTitle,setMovieTitle] = useState("")

  return (
    <TicketProvider>
    <AuthProvider>
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
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/auth" exact element={<AuthForm />} />
        <Route path="/auth/:id/verify/:token" exact element={<VerifyPage />} />
        <Route path="/Ticket/:eachid" element={<Ticket setMovieTitle={setMovieTitle} />} />
        <Route path="/Book" element={<Book movieTitle={movieTitle} />} />
        <Route path="/Book/snacks" element={<Snack movieTitle={movieTitle} />} />
        <Route path="/Book/seat" element={<Seat movieTitle={movieTitle} />} />
        <Route path="/Book/checkout" element={<Checkout movieTitle={movieTitle} />} />
        <Route path="/Book/finish" element={<Finish movieTitle={movieTitle} />} />
    </Routes>
    <Footer/>
    </AuthProvider>
    </TicketProvider>
      );
}

export default App;
