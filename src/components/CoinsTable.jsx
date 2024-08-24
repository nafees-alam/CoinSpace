import React, { useEffect, useState } from "react";
import {
  Container,
  TableCell,
  LinearProgress,
  Typography,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
  Pagination,
  Box,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { CoinList } from "../config/api";
import { useNavigate } from "react-router-dom";
import { CurrencyState } from "../CurrencyContext";



export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, SetLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const {currency, symbol} = CurrencyState();
    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
              main: "#fff",
            },
            mode: "dark",
          },
    })

    const fetchCoins = async () => {
        try {
            SetLoading(true);
            const {data} = await axios.get(CoinList(currency));
            
            setCoins(data);
            SetLoading(false);
        } catch (error) {
            SetLoading(false);
            console.log({error});
            
        }
    };

    useEffect(() => {
        fetchCoins();
        
    }, [currency]);

    const handleSearch = () => {
        return coins.filter((coin) => 
            coin.name.toLowerCase().includes(search.toLowerCase()) ||
            coin.symbol.toLowerCase().includes(search.toLowerCase())
        );
    }
  return (
    <ThemeProvider theme={darkTheme}>
        <Container sx={{ textAlign: "center"}}>
            <Typography
                variant='h4'
                sx={{ margin: 3, fontFamily: 'Montserrat'}}
            >
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
                label="Search for a Crypto Currency..."
                variant='outlined'
                sx={{ marginBottom: 2, width: '100%'}}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Box color='gold' sx={{ marginBottom: 2 }}>
                You can Click on any coin icon to see the Live Chart.
            </Box>
            <TableContainer component={Paper}>
                {loading ? (
                    <LinearProgress sx={{background: "gold"}}/>
                ) : (
                    <Table aria-label='simple table'>
                        <TableHead sx={{backgroundColor: "#EEBC1D", hieght: '4'}}>
                            <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                    sx={{
                                        color: "black",
                                        fontWeight: "700",
                                        fontFamily: "Montserrat"
                                    }}
                                    key={head}
                                    align={head === "Coin" ? "left" : "right"}
                                >
                                    {head}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {handleSearch()
                            .slice((page-1)*10, (page-1)*10 + 10)
                            .map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                console.log(row);
                                
                                return(
                                    
                                    <TableRow
                                    onClick={() => navigate(`/coins/${row.id}`)}
                                    sx={{
                                    backgroundColor: "#16171a",
                                    cursor: "pointer",
                                    "&:hover": {
                                        backgroundColor: "#131111",
                                    },
                                    fontFamily: "Montserrat",
                                    }}
                                    key={row.name}
                                    >
                                        <TableCell
                                        component="th"
                                        scope="row"
                                        sx={{
                                          display: "flex",
                                          gap: 2,
                                        }}
                                        >
                                            <img 
                                            src={row?.image}
                                            alt={row.name}
                                            height='50'
                                            style={{ marginBottom : 10}}
                                            />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column'
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                    textTransform: "uppercase",
                                                    fontSize: 22,
                                                    }}
                                                >
                                                    {row.symbol}
                                                </Typography>
                                                <Typography variant="body2" color='textSecondary'>
                                                    {row.name}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                        align="right"
                                        sx={{
                                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                          fontWeight: 500,
                                        }}
                                        >
                                            {profit && '+'}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(
                                                row.market_cap.toString().slice(0, -6)
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                            }
                        </TableBody>
                    </Table>
          )}
        </TableContainer>

        <Pagination 
            count = {Math.ceil(handleSearch()?.length / 10)}
            sx={{
                padding: 2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "gold",
                },
              }}
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 450)
              }}
        />

      </Container>
    </ThemeProvider>
  );
}

export default CoinsTable;