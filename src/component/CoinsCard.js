import React from 'react';
import { Link } from 'react-router-dom';
import { Heading, VStack,Text,Image, Button } from '@chakra-ui/react';

  const CoinsCard=({id,name,img,symbol,price,currencySymbol=" PKR"})=>(
    <Link to={`/coin/${id}`}>
      <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"} m={"4"} background={"#CAD0D8"}
       fontWeight="bold"
      css={{
        borderRadius:"120px 20px",
        "&:hover":{
          transform:"scale(1.1)",
          borderRadius:"100px",
          background:"black", 
          color:"white",
        }
      }}
      >
      <Image src={img} w={"10"} height={"10"} objectFit={"contain"} alt={"Exchanges"} />
        <Heading size={"md"} noOfLines={1}>{symbol}</Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price?`${currencySymbol} ${price}`:"NA"}</Text>
        <Button bgColor={"#24a0ed"} borderRadius="20px 7px" color={"blackAlpha.900"}>Detail</Button>
      </VStack>
    </Link>
  );
  

export default CoinsCard;