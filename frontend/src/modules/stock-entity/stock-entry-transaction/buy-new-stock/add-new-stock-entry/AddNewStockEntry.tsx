import {
    AddNewStockEntryForm,
    AddNewStockEntryValues,
} from './add-new-stock-entry-form/AddNewStockEntryForm'
import { useGetStockByStockTicker } from '../../../../../api/hooks/useStock'
import { useState } from 'react'

interface AddNewStockEntryProps {
    onSuccess: () => void
}

export function AddNewStockEntry({ onSuccess }: AddNewStockEntryProps) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const mutation = useGetStockByStockTicker()
    const onSubmit = ({ stockTicker }: AddNewStockEntryValues) => {
        mutation.mutate(
            { stockTicker },
            {
                onSuccess: () => onSuccess(),
                onError: () =>
                    setErrorMessage('Cannot find the requested Stock'),
            }
        )
    }
    return (
        <AddNewStockEntryForm onSubmit={onSubmit} errorMessage={errorMessage} />
    )
}
