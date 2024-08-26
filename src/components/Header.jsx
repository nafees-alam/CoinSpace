import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import {styled} from '@mui/system'
import { CurrencyState } from '../CurrencyContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    const Title = styled(Typography)(({ theme }) => ({
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer",
    }))
    
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            mode: 'dark'
        }
    })

    const {currency, setCurrency} = CurrencyState();

    console.log(currency);

    const handleClick = () => {
        navigate('/');
    }
    
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='transparent' position='static'>
        <Container>
            <Toolbar>
                <Title onClick={handleClick}>
                    Coin Space
                </Title>
                <Select variant='outlined'
                        sx={{ width: 100, height: 40, marginLeft: 2 }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                >
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'INR'}>INR</MenuItem>
                </Select>
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
