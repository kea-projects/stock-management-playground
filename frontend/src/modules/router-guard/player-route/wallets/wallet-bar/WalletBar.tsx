import { Wallet } from '../../../../../api/client'
import { Badge, Button, HStack, Text } from '@chakra-ui/react'

interface WalletBarProps {
    wallet: Wallet
}
export function WalletBar({ wallet }: WalletBarProps) {
    return (
        <HStack key={wallet._id} justifyContent="space-between" width="100%">
            <Text>{wallet.nickname}</Text>
            <Text>${wallet.balance?.toFixed(2)}</Text>
            <HStack>
                <Text>Invested In</Text>
                {wallet.stock_entries
                    ?.sort(
                        (stockEntryA, stockEntryB) =>
                            stockEntryB.amount * stockEntryB.paid_price -
                            stockEntryA.amount * stockEntryA.paid_price
                    )
                    .map((result) => {
                        return (
                            <Badge key={result._id} fontSize="xs">
                                <Text>{result.stock.stock_ticker}</Text>
                            </Badge>
                        )
                    })}
                <Button
                    variant="signInButton"
                    size="sm"
                    onClick={(e) => {
                        e.preventDefault()
                        console.log('hello')
                    }}
                >
                    buy another stock
                </Button>
            </HStack>
        </HStack>
    )
}
