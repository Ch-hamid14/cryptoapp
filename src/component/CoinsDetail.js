import { Box, Container, HStack, Radio, RadioGroup, VStack,Text,Image, Stat, StatLabel,
    StatNumber, StatArrow, StatHelpText, Badge, Progress, Button } from '@chakra-ui/react';
  import React,{useState,useEffect} from 'react'
  import Loader from './Loader';
  import Error from './Error';
  import axios from 'axios';
  import { server } from '../index';
  import Chart from './Chart';
  import {useParams} from 'react-router-dom';
  const CoinsDetail = () => {
   const [coin,setCoin]=useState({});
   const [loading,setLoading]=useState(true);
   const [error,setError]=useState(false);
   const [currency,setCurrency]=useState("pkr");
   const [days,setDays]=useState("24h");
   const [chartArray,setChartArray]=useState([]);
   const params=useParams();
   const currencySymbol=currency==="pkr" ? "PKR":currency==="eur" ? "€" : "$";
  
   const btns=["24h","7d","30d","60d","200d","365","max"];
  
   const switchChartStat=(key)=>{
     switch(key){
       case "24h":
       setDays('24h');
       setLoading(true);
       break;
       case "7d":
         setDays('7d');
         setLoading(true);
         break;
         case "30d":
           setDays('30d');
           setLoading(true);
           break;
         case "60d":
             setDays('60d');
             setLoading(true);
             break;
         case "200d":
               setDays('200d');
               setLoading(true);
               break;
         case "365":
                 setDays('365');
                 setLoading(true);
                 break;
         case "max":
                   setDays('max');
                   setLoading(true);
                   break;
       default:
           setDays('24h');
           setLoading(true);
           break;
     }
   }
  
   useEffect(()=>{
     const fetchCoin= async()=>{
       try {
         const {data} =await axios.get(`${server}/coins/${params.id}`);
  
            // {Chart Api}
         const {data:chartData}=await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
         setCoin(data); 
         setChartArray(chartData.prices);
         setLoading(false);
       } catch (error) { 
         setError(true);
         setLoading(false);
       }
     }
     fetchCoin();
   },[params.id,currency,days])
   if(error)return<Error />
   return (
     <Container maxW={"container.xl"}>
       {
       loading?<Loader/>
       :
       (
         <>
  
         {/* {Chart} */}
  
         <Box borderWidth={1} width={"full"}>
           <Chart currency={currencySymbol} arr={chartArray} days={days}/>
         </Box>
  
         <HStack p={"4"} overflowX={"auto"}>
           {
             btns.map((i)=>(
               <Button key={i} onClick={()=>switchChartStat(i)}>{i}</Button>
             ))
           }
         </HStack>
  
         {/* {currency Change} */}
  
  
         <RadioGroup value={"currency"} onChange={setCurrency} p={"8"}>
         <HStack spaceing={"4"}>
         <Radio value={"pkr"}>PKR</Radio>
         <Radio value={"USD"}>$</Radio>
         <Radio value={"eur"}>€</Radio>
         </HStack>
       </RadioGroup>
  
  
         {/* {Coin Detail} */}
  
  
       <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
         <Text fontSize={"large"} alignSelf={"center"} opacity={"2"}>
           Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
         </Text>
         <Image src={coin.image.large} w={"16"} height={"16"} objectFit={"contain"} />
         <Stat>
           <StatLabel>{coin.name}</StatLabel>
           <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
           <StatHelpText>
             <StatArrow type={coin.market_data.price_change_24h > 0 ? "increase" : "decrease"} />
             {coin.market_data.price_change_24h}
           </StatHelpText>
         </Stat>
         <Badge fontSize={"2xl"} bgColor={"rgb(75, 192, 192)"} color={"white"}>
           {`# ${coin.market_cap_rank}`}
         </Badge>
         <CustomBar  high={`${coin.market_data.high_24h[currency]}`} low={`${coin.market_data.low_24h[currency]}`} />
  
  
         {/* {Markeet Value} */}
  
  
         <Box w={"full"} p="4">
           <Item fontFamily={"cursive"} title={"Maximum supply"} value={coin.market_data.max_supply} />
           <Item fontFamily={"cursive"} title={"Circulating supply"} value={coin.market_data.circulating_supply} />
           <Item fontFamily={"cursive"} title={"Markeet Capital"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} />
           <Item fontFamily={"cursive"} title={"All time low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`} />
           <Item fontFamily={"cursive"} title={"All time high"} value={`${currencySymbol}${coin.market_data.ath[currency]}`} />
         </Box>
  
       </VStack>
         </>
       )
     }
     </Container>
   )
  }
  
  const CustomBar=({high,low})=>(
   <VStack w={"full"}>
     <Progress value={50} colorScheme={"teal"} w={"full"} />
     <HStack justifyContent={"space-between"} w={"full"}>
       <Badge children={low} colorScheme={"red"} />
       <Text fontSize={"sm"}>24H Range</Text>
       <Badge children={high} colorScheme={"green"} />
     </HStack>
   </VStack>
  )
  
  const Item=({title,value})=>(
   <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
     <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>{title}</Text>
     <Text>{value}</Text>
   </HStack>
  )
  
  export default CoinsDetail;