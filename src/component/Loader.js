import { Box, Spinner, VStack } from '@chakra-ui/react';
import React from 'react'

const Loader = () => {
  return (
    <VStack h={"90vh"} color={"blue.900"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner size={"xl"}>
        </Spinner>

      </Box>
    </VStack>
  )
}

export default Loader;