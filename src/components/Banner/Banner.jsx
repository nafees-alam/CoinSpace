import { Container, Typography } from '@mui/material'
import React from 'react'
import { styled } from "@mui/system";
import Carousel from './Carousel';

const BannerContainer = styled('div')({
    backgroundImage: "url(/banner2.jpg)",
})

const BannerContent = styled(Container)(({theme}) => ({
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
}))

const Tagline = styled('div')({
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
})

const CarousaelContainer = styled('div')({
    height: "50%",
    display: "flex",
    alignItems: "center",
})
const Banner = () => {
  return (
    <BannerContainer>
        <BannerContent>
            <Tagline>
                <Typography
                    variant="h2"
                    sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    fontFamily: "Montserrat",
                    }}
                >
                    Crypto App
                </Typography>
                <Typography
                    variant="subtitle2"
                    sx={{
                    color: "darkgrey",
                    textTransform: "capitalize",
                    fontFamily: "Montserrat",
                    }}
                >
                    Get all the Info regarding your favorite Crypto Currency.
                </Typography>
            </Tagline>
        </BannerContent>
        <Carousel />
    </BannerContainer>
  )
}

export default Banner