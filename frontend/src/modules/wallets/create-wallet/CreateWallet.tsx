import { Button, HStack, Input, useDisclosure } from '@chakra-ui/react'
import { GenericModal } from '../../../components/generic-modal/GenericModal'
import { useForm } from 'react-hook-form'
import { useCreateNewWallet, WalletsKeys } from "../../../api/hooks/useWallets";
import { useQueryClient } from "@tanstack/react-query";

export interface CreateWalletMeValues {
    nickname: string
}

export function CreateWallet() {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { register, handleSubmit } = useForm<CreateWalletMeValues>()
    const mutation = useCreateNewWallet()
    const queryClient = useQueryClient()
    const onSubmit = (createWalletValues: CreateWalletMeValues) => {
        mutation.mutate(createWalletValues, {
          onSuccess: async ()=> {
            await queryClient.invalidateQueries([WalletsKeys.allWalletsMe, WalletsKeys.singleWalletMe])
            await queryClient.refetchQueries()
            onClose()
          }
        })
    }
    return (
        <>
            <HStack justifyContent="flex-end" width="100%">
                <Button variant="signInButton" onClick={() => onOpen()}>
                    Create Wallet
                </Button>
            </HStack>
            <GenericModal
                isOpen={isOpen}
                onClose={onClose}
                title={'Create new wallet'}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input {...register('nickname', { required: true })} />
                    <Button variant="signInButton" type="submit">Create new Wallet</Button>
                </form>
            </GenericModal>
        </>
    )
}
