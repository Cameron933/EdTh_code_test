import React from "react";
import StudentTable from "./components/StudentTable";
import { Flex, VStack } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <VStack bg="#2546ce" h="100%" w="100%">
      <Flex w="100%" h="20%" bg="#17e07d" color="white" align="center" justify="center">
        <Flex fontSize="3xl">Welcome to the Education Horizons</Flex>
      </Flex>
      <Flex alignItems="flex-start" justifyContent="center" h="80%" fontSize="lg" mt="2rem">
        <StudentTable />
      </Flex>
    </VStack>
  );
};

export default App;
