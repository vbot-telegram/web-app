import { Center, Flex, Spinner, Text } from "@chakra-ui/react";

export default function Loader() {
  return (
    <Flex minHeight="100vh" align="center" justify="center">
      <Center>
        <Spinner
          thickness="3px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="md"
          mr={4}
        />
        <Text color={"white"} fontWeight={"bold"} fontSize={24}>Loading, please wait...</Text>
      </Center>
    </Flex>
  )
}