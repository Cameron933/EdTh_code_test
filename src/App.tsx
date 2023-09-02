import React from "react";
import StudentTable from "./components/StudentTable";
import { Box, Flex } from "@chakra-ui/react";

const App: React.FC = () => {
  return (
    <Box bg="#2546ce" h="100vh">
      <Box bg="#17e07d" color="white">
        <Flex alignItems="center" justifyContent="center" h="20%" fontSize="3xl">
          Welcome to the Education Horizons
        </Flex>
      </Box>
      <Flex alignItems="center" justifyContent="center" h="40%" fontSize="lg">
        <StudentTable />
      </Flex>
    </Box>
  );
};

export default App;
