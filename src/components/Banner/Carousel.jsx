import React, { useEffect, useState } from 'react'
import { CurrencyState } from '../../CurrencyContext';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { Link } from 'react-router-dom';
import { Box, Container, Typography } from '@mui/material';
import AliceCarousel from 'react-alice-carousel';

const Carousel = () => {
    const [trending, SetTrending] = useState([]);
    const {currency, symbol} = CurrencyState();

    const fetchTrendingCoins = async() => {
        const {data} = await axios.get(TrendingCoins(currency));
        SetTrending(data);
    }

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {
        let profit = coin?.price_change_percentage_24h >= 0;

        return(
            <Link
              to={`/coins/${coin.id}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                textTransform: "uppercase",
                color: "white",
              }}
              key={coin.id}
            >
                <img 
                  src={coin?.image}
                  alt={coin.name}
                  height='80'
                  style={{ marginBottom: 10 }}
                />
                <Typography variant='body2'>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                            fontWeight: 500
                        }}
                    >
                        {profit && '+'}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </Typography>
                <Typography>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                    
                </Typography>
            </Link>
        )
    })

    const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };
  return (
    <Container
        sx={{
            height: "50%",
            display: "flex",
            alignItems: "center",
        }}
    >
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={items}
            autoPlay
        />
    </Container>
  )
}

export default Carousel