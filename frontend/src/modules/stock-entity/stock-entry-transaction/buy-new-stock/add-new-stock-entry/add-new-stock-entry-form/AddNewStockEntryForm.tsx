import { useForm } from 'react-hook-form'
import { Button, HStack, Input, FormErrorMessage, FormControl } from "@chakra-ui/react";

interface AddNewStockEntryFromProps {
    onSubmit: (addNewStockEntryValues: AddNewStockEntryValues) => void
    errorMessage?: string
}

export interface AddNewStockEntryValues {
    stockTicker: string
}

export function AddNewStockEntryForm({
    onSubmit,
                                       errorMessage,
}: AddNewStockEntryFromProps) {
    const { register, handleSubmit } = useForm<AddNewStockEntryValues>()
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errorMessage!==undefined}>
            <HStack>
                <Input
                    placeholder={'Stock Ticker'}
                    {...register('stockTicker', { required: true })}
                />
                <Button variant="signInButton" type="submit">
                    Add Stock
                </Button>
            </HStack>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>

          </FormControl>
        </form>
    )
}
