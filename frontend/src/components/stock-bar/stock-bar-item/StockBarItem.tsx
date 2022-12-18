import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Stock } from "../../../api/client";

interface StockBarItemProps {
  stock: Stock;
}

export function StockBarItem({ stock }: StockBarItemProps) {
  return (
    <HStack width="100%" justifyContent="space-between" my={2}>
      <Image
        borderRadius="full"
        boxSize="50px"
        src={stock.logo}
        alt={stock.stock_ticker}
      />
      <VStack width="100%" spacing={0}>
        <Text fontSize="xs">{stock.name}</Text>
        <Text fontSize="xs">
          {stock.current_price?.toFixed(2)}$
        </Text>
        <HStack>
          <Box>{stock.percentage_change!! < 0 ? <TriangleUpIcon color="green" /> :
            <TriangleDownIcon color="red" />}</Box>{" "}
          <Text fontSize="xx-small">
            {stock.percentage_change?.toFixed(2)}%
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}