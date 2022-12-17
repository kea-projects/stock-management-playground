import { BuyNewStockFormValues } from '../BuyNewStock'
import { useForm } from 'react-hook-form'
import {
    Button,
    HStack,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    VStack,
} from '@chakra-ui/react'
import {
    useGetAllStocks,
} from '../../../../../api/hooks/useStock'

interface BuyNewStockFormProps {
    walletId: string
    onSubmit: (buyNewStockFormValues: BuyNewStockFormValues) => void
}
export function BuyNewStockForm({ onSubmit, walletId }: BuyNewStockFormProps) {
    const { register, handleSubmit } = useForm<BuyNewStockFormValues>({
        defaultValues: { walletId: walletId },
    })
    const { data } = useGetAllStocks()

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
                <HStack>
                    <Select
                        placeholder={'Stock name'}
                        {...register('stockId', { required: true })}
                    >
                        {data
                            ? data.map((stock) => (
                                  <option value={stock._id} key={stock._id}>
                                      {stock.name}
                                  </option>
                              ))
                            : null}
                    </Select>
                    <NumberInput
                        defaultValue={0}
                        clampValueOnBlur={false}
                        placeholder={'amount'}
                    >
                        <NumberInputField
                            {...register('amount', {
                                required: 'This field is required',
                                min: 1,
                            })}
                        />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                </HStack>
                <Button type="submit" variant={'signInButton'}>
                    Buy Stock
                </Button>
            </VStack>
        </form>
    )
}
