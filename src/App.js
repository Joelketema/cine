
import { Text, Box } from "@chakra-ui/react"
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Footer from "./components/Footer"
import Ticket from "./pages/Ticket"
import { Switch } from '@chakra-ui/react'

function App() {
  return (
    <>
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/Ticket/:eachid" element={<Ticket/>}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
