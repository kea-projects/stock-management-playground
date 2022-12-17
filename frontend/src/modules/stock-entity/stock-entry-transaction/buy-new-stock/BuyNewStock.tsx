import { BuyNewStockForm } from './buy-new-stock-form/BuyNewStockForm'
import { useBuyNewStockEntry } from '../../../../api/hooks/useStockEntry'
import {
    Link,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    Text,
    PopoverTrigger,
    useDisclosure,
} from '@chakra-ui/react'
import { AddNewStockEntry } from './add-new-stock-entry/AddNewStockEntry'
import { useQueryClient } from '@tanstack/react-query'
import { stockKeys } from '../../../../api/hooks/useStock'

interface BuyNewStockProps {
    walletId: string
    onSuccess: () => void
}

export interface BuyNewStockFormValues {
    amount: number
    stockId: string
    walletId: string
}

export function BuyNewStock({ walletId, onSuccess }: BuyNewStockProps) {
    const mutation = useBuyNewStockEntry()
    const onSubmit = ({ amount, walletId, stockId }: BuyNewStockFormValues) => {
        mutation.mutate(
            {
                stock_id: stockId,
                amount: amount,
                wallet_id: walletId,
            },
            {
                onSuccess: () => onSuccess(),
            }
        )
    }
    const { isOpen, onToggle, onClose } = useDisclosure()
    const queryClient = useQueryClient()
    const onSuccessFindNewStock = async () => {
        await queryClient.invalidateQueries([stockKeys.allStocks])
        await queryClient.refetchQueries()
        onClose()
    }
    return (
        <>
            <BuyNewStockForm onSubmit={onSubmit} walletId={walletId} />
            <Popover isOpen={isOpen}>
                <PopoverTrigger>
                    <Link onClick={() => onToggle()}>
                        Can't find the stock?
                    </Link>
                </PopoverTrigger>
                <PopoverContent backgroundColor="chosenNavigationBarColor">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader>
                        <Text>Search for new Stock</Text>
                    </PopoverHeader>
                    <PopoverBody>
                        <AddNewStockEntry onSuccess={onSuccessFindNewStock}/>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}
