import { Skeleton, Td, Tr } from "@chakra-ui/react";
import React from "react";

type LoadingTableRowProps = {
  cellCount?: number;
};

type LoadingTableProps = {
  rowCount?: number;
  cellCount?: number;
};

const LoadingTableRow: React.FC<LoadingTableRowProps> = ({ cellCount = 3 }) => {
  return (
    <Tr>
      {Array.from({ length: cellCount }).map((_, idx) => (
        <Td key={idx}>
          <Skeleton height="20px" />
        </Td>
      ))}
    </Tr>
  );
};

const LoadingTable: React.FC<LoadingTableProps> = ({ rowCount = 3, cellCount = 3 }) => {
  return (
    <>
      {Array.from({ length: rowCount }).map((_, idx) => (
        <LoadingTableRow key={idx} cellCount={cellCount} />
      ))}
    </>
  );
};

export default LoadingTable;
