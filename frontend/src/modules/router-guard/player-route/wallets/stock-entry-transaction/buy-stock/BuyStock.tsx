import { StockEntry } from '../../../../../../api/client'
import { useBuyStockEntry } from '../../../../../../api/hooks/useStockEntry'
import {
    StockEntryTransaction,
    StockEntryTransactionForm,
    TransactionType,
} from '../stock-entry-transaction-form/StockEntryTransactionForm'

interface BuyStockProps {
    walletBalance: number
    stockEntry: StockEntry
    onSuccess: () => void
}
export function BuyStock({
    walletBalance,
    stockEntry,
    onSuccess,
}: BuyStockProps) {
    const mutation = useBuyStockEntry()
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
            transactionType={TransactionType.buy}
        />
    )
}
