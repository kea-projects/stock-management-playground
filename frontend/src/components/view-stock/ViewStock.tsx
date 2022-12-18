import { Text, VStack } from '@chakra-ui/react'
import { useGetStock } from '../../api/hooks/useStock'
import { Graph } from '../graph/Graph'

interface ViewStockProps {
    stockTicker: string
}
interface StockDataForGraph {
    price: number
    name: string
}
export function ViewStock({ stockTicker }: ViewStockProps) {
    const { data } = useGetStock({ stockTicker })
    const dataForGraph = (): StockDataForGraph[] => {
        if (data?.history) {
            return data.history.map((history) => {
                const date = new Date(history.recorded_at)
                const name = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${
                    date.getMonth() + 1
                }`
                const stockDataGraph: StockDataForGraph = {
                    price: history.price ?? 0,
                    name,
                }
                return stockDataGraph
            })
        } else return []
    }
    return (
        <VStack width="100%" height="100%">
            <Text>{stockTicker}</Text>
            <Graph data={dataForGraph()} dataKeyX={'name'} dataKeyY={'price'} />
        </VStack>
    )
}
