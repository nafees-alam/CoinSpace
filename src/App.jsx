import { Box } from '@mui/material'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import CoinPage from './pages/CoinPage'


function App() {

  return (
    <BrowserRouter>
    <Box
      sx={{
        backgroundColor: "#14161a",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/coins/:id' element={<CoinPage />} />
      </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
