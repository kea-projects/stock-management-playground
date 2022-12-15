import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    Skeleton,
} from '@chakra-ui/react'
import { useGetAllWalletsMe } from '../../../../api/hooks/useWallets'
import { DetailsBox } from '../../../../components/details-box/DetailsBox'
import { WalletBar } from './wallet-bar/WalletBar'

export function Wallets() {
    const { data, isLoading } = useGetAllWalletsMe()

    return (
        <DetailsBox width="100%">
            <Accordion width="100%" allowToggle>
                <Skeleton isLoaded={!isLoading} width="100%" height={8}>
                    {data?.map((wallet) => (
                        <AccordionItem
                            borderColor="transparent"
                            key={wallet._id}
                        >
                            <AccordionButton>
                                <WalletBar wallet={wallet} />
                                <AccordionIcon />
                            </AccordionButton>
                        </AccordionItem>
                    ))}
                </Skeleton>
            </Accordion>
        </DetailsBox>
    )
}
