import { HStack,Button} from '@chakra-ui/react';
import React from 'react';
import {Link} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
const Header = () => {
  return (
    <>
    <HStack p={"4"} shadow={"base"} bgColor={"#718096"}>
      <Button leftIcon={<HomeIcon />} marginLeft={'auto'}  background={"none"} color={"white"}
       component={Link} to="/home" 
       css={{
        "&:hover":{
          background:"none",
          borderBottom:"2px solid red"
        }
       }
       }>
        <Link to="/">Home</Link>
      </Button>
      <Button  leftIcon={<CurrencyExchangeIcon />} background={"none"} color={"white"} css={{
        "&:hover":{
          background:"none",
          borderBottom:"2px solid red"
        }
       }
       }>
        <Link to="/exchanges">Exchanges</Link>
      </Button>
      <Button leftIcon={<CurrencyBitcoinIcon />} background={"none"} color={"white"} css={{
        "&:hover":{
          background:"none",
          borderBottom:"2px solid red"
        }
       }
       }>
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
    </>
  )
}

export default Header;