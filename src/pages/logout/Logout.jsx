import React, { useEffect } from 'react'
import {
    BannerContainer,
    BannerContent,
    BannerDescription,
    BannerImage,
    BannerLoginContainer,
    BannerShopButton,
    BannerTitle,
  } from "../../components/styles/banner";
  import { Typography } from '@mui/material';
const Logout = () => {
    useEffect(()=>{

    },[])
  return (
    <BannerContainer >
    <BannerContent>
      <BannerTitle variant="h6" >
      <Typography variant="h6"> </Typography>
      </BannerTitle>
      <BannerDescription variant="subtitle">
     Thank you for using MobiCash
      </BannerDescription>
      <BannerShopButton color="primary"></BannerShopButton>
    </BannerContent>
  </BannerContainer>
  )
}

export default Logout