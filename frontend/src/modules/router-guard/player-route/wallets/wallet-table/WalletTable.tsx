import { StockEntry, Wallet } from '../../../../../api/client'
import { ColumnDef } from '@tanstack/react-table'
import { Box } from '@chakra-ui/react'
import { GenericTable } from '../../../../../components/generic-table/GenericTable'
import { BuySellStockButtons } from '../stock-entry-transaction/buy-sell-stock-buttons/BuySellStockButtons'

interface WalletTableProps {
    wallet: Wallet
}

export function WalletTable({ wallet }: WalletTableProps) {
    const columns: ColumnDef<StockEntry>[] = [
        {
            accessorKey: 'stock.stock_ticker',
            header: 'Stock Ticker',
            cell: (value) => value.getValue(),
        },
        {
            accessorKey: 'stock.current_price',
            header: 'Current Price',
            cell: (value) => (
                <Box>
                    ${value.row.original.stock?.current_price?.toFixed(2)}
                </Box>
            ),
        },
        {
            accessorKey: 'paid_price',
            header: 'Paid Price',
            cell: (value) => (
                <Box>${value.row.original.paid_price.toFixed(2)}</Box>
            ),
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: (value) => value.getValue(),
        },
        {
            accessorKey: '_id',
            header: '',
            cell: (value) => (
                <BuySellStockButtons
                    walletBalance={wallet.balance ?? 0}
                    stockEntry={value.row.original}
                />
            ),
        },
    ]
    return <GenericTable columns={columns} data={wallet.stock_entries ?? []} />
}
