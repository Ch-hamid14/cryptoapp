import { Alert, AlertDescription, AlertIcon, AlertTitle, Stack } from '@chakra-ui/react';
import React from 'react'

const Error = () => {
  return (
    <Stack>
  <Alert status='error' justifyContent="center">
  <AlertIcon />
  <AlertTitle>Oopsss! Something Wrong</AlertTitle>
  <AlertDescription>Error while Fetching data</AlertDescription>
</Alert>
</Stack>
  )
}

export default Error;