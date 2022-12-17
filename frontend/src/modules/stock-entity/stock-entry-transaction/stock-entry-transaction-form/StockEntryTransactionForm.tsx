import { useForm } from 'react-hook-form'
import { StockEntry } from '../../../../api/client'
import {
    Button,
    HStack,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    VStack,
} from '@chakra-ui/react'

export interface StockEntryTransaction {
    stockId: string
    amount: number
    stockTicker: string
}

export enum TransactionType {
    buy = 'buy',
    sell = 'SELL',
}

interface StockEntryTransactionFormProps {
    stockEntry?: StockEntry
    transactionType: TransactionType
    onSubmit: (walletTransaction: StockEntryTransaction) => void
    walletBalance: number
}

export function StockEntryTransactionForm({
    stockEntry,
    transactionType,
    onSubmit,
    walletBalance,
}: StockEntryTransactionFormProps) {
    const { register, handleSubmit, setValue } =
        useForm<StockEntryTransaction>()
    setValue('stockId', stockEntry?._id ?? '')
    const isSell = transactionType === TransactionType.sell
    const maxAmount = isSell
        ? stockEntry?.amount ?? 0
        : walletBalance / (stockEntry?.stock?.current_price ?? 0)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <HStack alignItems="flex-end">
                    <Input
                        {...register('stockTicker')}
                        defaultValue={stockEntry?.stock.stock_ticker}
                        disabled={true}
                        placeholder={stockEntry?.stock.stock_ticker + ''}
                    />

                    <NumberInput
                        defaultValue={isSell ? stockEntry?.amount : 0}
                        max={maxAmount}
                        clampValueOnBlur={false}
                        placeholder={stockEntry?.amount + ''}
                    >
                        <NumberInputField
                            {...register('amount', {
                                required: 'This field is required',
                                max: maxAmount,
                            })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
                <Button type="submit" variant="signInButton">
                    {isSell ? 'Sell Stock' : 'Buy Stock'}
                </Button>
            </VStack>
        </form>
    )
}
