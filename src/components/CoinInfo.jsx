import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../CurrencyContext';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { Box, CircularProgress, createTheme, ThemeProvider } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { chartDays } from '../config/chartDays';
import SelectButton from './SelectButtons';

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
            ) : (
                <>
                 <Line 
                  data= {{
                    labels: historicData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time = date.getHours() > 12
                                   ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                   : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                    }),
                    datasets: [
                        {
                            data: historicData.map((coin) => coin[1]),
                            label: `price ( Past ${days} Days) in ${currency}`,
                            borderColor: '#EEBC1D'
                        }
                    ]
                  }}
                  options={{
                    elements: {
                      point: {
                        radius: 1,
                      },
                    },
                  }}
                 />
                 <Box
                   sx={{
                    display: "flex",
                    marginTop: 2,
                    justifyContent: "space-around",
                    width: "100%",
                  }}
                 >
                    {chartDays.map((day) => (
                        <SelectButton
                          key={day.value}
                          onClick = {() => {
                            setDays(day.value);
                            setFlag(false);
                          }}
                          selected = {day.value === days}
                        >
                            {day.label}
                        </SelectButton>
                    ))}
                 </Box>
                </>
            )}
        </Box>
    </ThemeProvider>
  )
}

export default CoinInfo