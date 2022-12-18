import { Button, useDisclosure } from '@chakra-ui/react'
import { GenericModal } from '../../../../../components/generic-modal/GenericModal'
import { BuyNewStock } from '../BuyNewStock'
import { useQueryClient } from '@tanstack/react-query'
import { WalletsKeys } from "../../../../../api/hooks/useWallets";

interface BuyNewStockButtonProps {
    walletId: string
}

export function BuyNewStockButton({ walletId }: BuyNewStockButtonProps) {
    const queryClient = useQueryClient()
    const { onOpen, onClose, isOpen } = useDisclosure()
    const openBuyNewStockModal = () => {
        onOpen()
    }
    const onSuccess = async () => {
      await queryClient.invalidateQueries([WalletsKeys.singleWalletMe, WalletsKeys.allWalletsMe])
      await queryClient.refetchQueries()
      onClose()
    }
    return (
        <>
            <Button
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                }}
                variant="signInButton"
                size="sm"
                onClick={() => {
                    openBuyNewStockModal()
                }}
            >
                buy another stock
            </Button>
            <GenericModal isOpen={isOpen} onClose={onClose}>
                <BuyNewStock onSuccess={onSuccess} walletId={walletId} />
            </GenericModal>
        </>
    )
}
