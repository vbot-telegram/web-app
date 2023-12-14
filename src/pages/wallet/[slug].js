import Head from 'next/head'
import { useRouter } from "next/router";
import { Box, Button, Card, Center, Flex, Text, useClipboard } from "@chakra-ui/react"
import { IoIosCloud } from "react-icons/io";
import { useEffect, useState } from "react";
import Loader from "../../components/loader";
import axios from "axios";

const metadata = (
  <Head>
    <title>Vbot - Wallet</title>
    <meta name="description" content="Vbot - Wallet"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link rel="icon" href="/favicon.ico"/>
  </Head>
)

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const code = router.query.slug;

  const [data, setData] = useState([]);
  useEffect(() => {
    if (!code) return;
    (async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${code}`);
        const data = response.data;
        setData(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [code])

  const [isDecoded, setIsDecoded] = useState(false);
  const {onCopy, setValue} = useClipboard("");

  const handleCopyClick = async (v) => {
    await setValue(v);
    await onCopy();
  };

  const handleDecode = () => {
    setIsDecoded(true);
  }

  if (loading) {
    return (
      <>
        {metadata}
        <Loader/>
      </>
    )
  }

  return (
    <>
      {metadata}
      <Flex minHeight="100vh" align="center" justify="center">
        <Center>
          <Card background={"gray.700"} width={{base: "90vw", md: "40vw"}}>
            <Flex alignItems="center" justifyContent="center" paddingTop={2}>
              <IoIosCloud size={26} color={"gray"}/>
              <Text
                color={"white"}
                fontSize={24}
                fontWeight={"extrabold"}
                ml={2}
              >
                Vbot Cloud</Text>
            </Flex>
            <Box alignItems={"center"} paddingX={4} paddingBottom={2} mx={"auto"}>
              <Text
                color={"gray.400"}
                fontSize={12}
                fontWeight={"medium"}
              >
                Delivering secure encrypted user data through Vbot cloud</Text>
            </Box>
            <Box marginX={1} mb={1}>
              <Box
                background={"gray.800"}
                padding={3}
                borderTopRadius={6}
              >
                <Text
                  color={"white"}
                  fontSize={18}
                  fontWeight={"bold"}
                >
                  User Private Key
                </Text>
                <Text color={"gray.400"} fontSize={12} fontWeight={"medium"} align={"justify"}>Click the button below to
                  reveal your wallet&#39;s private key. Data is delivered
                  through encrypted
                  secure randomized channels. This page is single access and contains impermanent data. Upon access this
                  page and its encrypted data self-destructs and is completely erased. This page and its content no
                  longer
                  exist.</Text>
              </Box>

              {!isDecoded &&
                (<Box
                  background={"gray.900"}
                  borderBottomRadius={6}
                  borderTop={"1px solid black"}
                  height={160}
                  overflowY={"auto"}
                >
                  <Flex justify="center" height={"100%"}>
                    <Center>
                      <Button
                        colorScheme="blue"
                        rounded={"full"}
                        size={"sm"}
                        onClick={handleDecode}
                        isDisabled={data === "Invalid code"}
                      >{data === "Invalid code" ? "Nothing to see here" : "Decode Private Key"}</Button>
                    </Center>
                  </Flex>
                </Box>)
                ||
                (<Box
                  background={"gray.900"}
                  borderBottomRadius={6}
                  borderTop={"1px solid black"}
                  height={{base: 160, md: "auto"}}
                  overflowY={"auto"}
                >
                  {data.map((wallet, index) => (
                    <Box borderBottom={index != data.length - 1 ? "1px dashed gray" : ""} paddingX={2} key={index}>
                      <Text
                        mt={2}
                        color={"gray.400"}
                        fontSize={12}
                        fontWeight={"bold"}
                        align={"justify"}>W{index + 1} Address</Text>
                      <Text
                        color={"blue.400"}
                        fontSize={12}
                        fontWeight={"medium"}
                        align={"justify"}
                        onClick={() => handleCopyClick(wallet.address)}
                        style={{cursor: 'pointer'}}>{wallet.address}</Text>
                      <Text
                        mt={2}
                        color={"gray.400"}
                        fontSize={12}
                        fontWeight={"bold"}
                        align={"justify"}>W{index + 1} Private</Text>
                      <Text
                        mb={1}
                        color={"blue.600"}
                        fontSize={12}
                        fontWeight={"medium"}
                        align={"justify"}
                        whiteSpace="normal"
                        onClick={() => handleCopyClick(wallet.address)}
                        style={{cursor: 'pointer'}}
                      >{wallet.privateKey}</Text>
                    </Box>
                  ))}
                </Box>)
              }
            </Box>
          </Card>
        </Center>
      </Flex>
    </>
  )
}
