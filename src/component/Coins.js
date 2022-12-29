import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import Error from './Error';
import { server } from '../index';
import { Container, Button, HStack,RadioGroup,Radio, Text
} from '@chakra-ui/react';
import Loader from './Loader';
import CoinsCard from './CoinsCard';
const Coins = () => {
  const [currency,setCurrency]=useState("pkr");
  const [coins,setCoins]=useState([]);
  const [error,setError]=useState(false);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(true);
  const currencySymbol=currency==="pkr"?"PKR":currency==="eur"?"€" : "$";
  
  //                      Search
  
  //                           ///////
  const changePage=(page)=>{
    setPage();
    setLoading(true);
  };
  const btn=new Array(150).fill(1);
  
  useEffect(()=>{
    const fetchCoins= async()=>{
      try {
        const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data); 
        setLoading(false);
      } catch (error) { 
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins();
  },[currency,page])
  if(error)return<Error />

  return (
    <Container maxW={"container.xl"}>
      {loading?(<Loader/>):(
      <>
      <Text textAlign={"center"} fontSize="2rem" color={"grey"}
       cursor={"pointer"} fontFamily="Roboto">All Available Coins</Text>
      <RadioGroup value={"currency"} onChange={setCurrency} p={"8"} defaultValue="1">
        <HStack spaceing={"4"}  fontWeight={"bold"} justifyContent={"center"}>
        <Radio value={"pkr"}>PKR</Radio>
        <Radio value={"eur"}>EUR-€</Radio>
        <Radio value={"USD"}>USD-$</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
        {
          coins.map((i)=>(
            <CoinsCard          
             key={i.id} id={i.id}
            name={i.name} price={i.current_price} img={i.image} symbol={i.symbol} 
             currencySymbol={currencySymbol} />
          ))}
      </HStack>
      <HStack wrap={"wrap"} w={"full"} p={"10"} justifyContent={"space-evenly"}>
        {
          btn.map((item,index)=>(
            <Button key={index} bgColor={"black"} color={"white"} onClick={()=>changePage(index+1)} css={{
              "&:hover":{
                background:"blue"
              }
            }}>
              {index+1}
            </Button>
          ))
        }
      </HStack>
      </>
      )}
    </Container>
  );
};

export default Coins;