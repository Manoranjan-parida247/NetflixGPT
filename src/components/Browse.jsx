import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTION } from '../utils/constant'

const Browse = () => {
  const getNowPlayingMovies = async ()=>{
    const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', API_OPTION)
    const json = await data.json();
    console.log(json.results)
  }

  useEffect(()=>{
    getNowPlayingMovies();
  },[])
  return (
    <Box>
      <Header/>
    </Box>
  )
}

export default Browse