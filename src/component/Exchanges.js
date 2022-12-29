import React,{ useEffect,useState } from 'react';
import axios from 'axios';
import Error from './Error';
import { server } from '../index';
import { Container, Heading, HStack, VStack,Text,Image, Button} from '@chakra-ui/react';
import Loader from './Loader';
const Exchanges = () => {
  const [exchanges,setExchanges]=useState([]);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);

  useEffect(()=>{
    const fetchExchange= async()=>{
      try {
        const {data} =await axios.get(`${server}/exchanges`);
        setExchanges(data); 
        setLoading(false);
      } catch (error) { 
        setError(true);
        setLoading(false);
      }
    }
    fetchExchange();
  },[])
  if(error)return<Error />
  return (
    <Container maxW={"container.xl"} paddingTop={"5"}>
      {loading?(<Loader/>):(
      <>
      <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
        {
          exchanges.map((i)=>(
            <ExchangeCard
            key={i.id}
            name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
          ))}
      </HStack>
      </>
      )}
    </Container>
  );
};
const ExchangeCard=({name,img,rank,url})=>(
  <a href={url} target="blank">
    <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} 
     background={"#CAD0D8"} color={"black"} fontWeight={"bold"} 
    css={{
      borderRadius:"120px 20px",
      "&:hover":{
        transform:"scale(1.1)",
        borderRadius:"100px",
        background:"black",
        color:"white"
      }
    }}
    >
    <Image src={img} w={"20"} height={"20"} objectFit={"contain"} alt={"Exchanges"} borderRadius={"50px 50px"} />
      <Heading size={"md"} noOfLines={1}>{`#${rank}`}</Heading>
      <Text noOfLines={1}>{name}</Text>
      <Button borderRadius={"20px 7px"} bgColor="#24a0ed" color={"blackAlpha.900"}>Exchange</Button>
    </VStack>
  </a>
);

export default Exchanges;
