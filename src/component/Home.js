import {Box} from '@chakra-ui/react';
import React from 'react';
import  background  from '../images/background.jpg';
import { Image } from '@chakra-ui/react';
import Snowfall from 'react-snowfall';
const Home = () => {
  return (
    <>
    <Box>
      <Snowfall />
      <Image width={"100%"} height="100vh" src={background} />
    </Box>
    </>
  )
}
export default Home;