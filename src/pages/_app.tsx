import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Box, ChakraProvider } from '@chakra-ui/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Box backgroundColor="gray.800" minHeight="100vh" p={4}>
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  )
}
