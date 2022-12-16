import { StockEntry } from '../../../../../../api/client'
import { Button, HStack, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import { TransactionType } from '../stock-entry-transaction-form/StockEntryTransactionForm'
import { GenericModal } from '../../../../../../components/generic-modal/GenericModal'
import { SellStock } from '../sell-stock/SellStock'
import { BuyStock } from '../buy-stock/BuyStock'

interface BuySellStockButtonsProps {
    stockEntry: StockEntry
    walletBalance: number
}
export function BuySellStockButtons({
    stockEntry,
    walletBalance,
}: BuySellStockButtonsProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sellOrBuy, setSellOrBuy] = useState<TransactionType>(
        TransactionType.sell
    )
    return (
        <HStack>
            <Button
                variant="signInButton"
                onClick={() => {
                    setSellOrBuy(TransactionType.sell)
                    onOpen()
                }}
            >
                Sell
            </Button>
            <Button
                variant="signInButton"
                onClick={() => {
                    setSellOrBuy(TransactionType.buy)
                    onOpen()
                }}
            >
                Buy
            </Button>
            <GenericModal isOpen={isOpen} onClose={onClose}>
                {sellOrBuy === TransactionType.sell ? (
                    <SellStock
                        stockEntry={stockEntry}
                        onSuccess={onClose}
                        walletBalance={walletBalance}
                    />
                ) : (
                    <BuyStock
                        stockEntry={stockEntry}
                        onSuccess={onClose}
                        walletBalance={walletBalance}
                    />
                )}
            </GenericModal>
        </HStack>
    )
}
