import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../CurrencyContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { CircularProgress, createTheme, ThemeProvider } from '@mui/material';

const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const {currency} = CurrencyState();
    const [flag, setFlag] = useState(false);

    const fetchHistoricData = async() => {
        const {data} = await axios.get(HistoricalChart(coin.id, days, currency));
        setFlag(true)
        setHistoricData(data.prices);
    }

    useEffect(() => {
        fetchHistoricData();
    }, [currency, days])

    const darkTheme = createTheme({
        palette: {
            mode: "dark",
            primary: {
              main: "#fff",
            },
          },
    })
  return (
    <ThemeProvider theme={darkTheme}>
        <Box
          sx={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3,
            padding: { xs: 2, md: 5 },
          }}
        >
            {!historicData || flag === false ? (
                <CircularProgress 
                  sx={{ color : 'gold'}}
                  size={250}
                  thickness={1}
                />
            )}
        </Box>
    </ThemeProvider>
  )
}

export default CoinInfo