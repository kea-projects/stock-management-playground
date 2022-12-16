import { StockEntry } from '../../../../../../api/client'
import {
    StockEntryTransaction,
    StockEntryTransactionForm,
    TransactionType,
} from '../stock-entry-transaction-form/StockEntryTransactionForm'
import { useSellStockEntry } from '../../../../../../api/hooks/useStockEntry'

interface SellStockProps {
    stockEntry: StockEntry
    walletBalance: number
    onSuccess: () => void
}

export function SellStock({
    stockEntry,
    walletBalance,
    onSuccess,
}: SellStockProps) {
    const mutation = useSellStockEntry()
    const onSubmit = (stockEntryTransaction: StockEntryTransaction) => {
        mutation.mutate(
            {
                stockId: stockEntryTransaction.stockId,
                amount: { amount: stockEntryTransaction.amount },
            },
            {
                onSuccess: onSuccess,
            }
        )
    }

    return (
        <StockEntryTransactionForm
            walletBalance={walletBalance}
            stockEntry={stockEntry}
            onSubmit={onSubmit}
            transactionType={TransactionType.sell}
        />
    )
}
