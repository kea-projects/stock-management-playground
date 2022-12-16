import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Button,
    Skeleton,
} from '@chakra-ui/react'
import { useGetAllWalletsMe } from '../../../../api/hooks/useWallets'
import { DetailsBox } from '../../../../components/details-box/DetailsBox'
import { WalletBar } from './wallet-bar/WalletBar'
import { WalletTable } from './wallet-table/WalletTable'

export function Wallets() {
    const { data, isLoading } = useGetAllWalletsMe()

    return (
        <DetailsBox width="100%">
            <Accordion width="100%" allowToggle>
                <Skeleton isLoaded={!isLoading} width="100%" minHeight={8}>
                    {data?.map((wallet) => (
                        <AccordionItem
                            borderColor="transparent"
                            key={wallet._id}
                        >
                            <AccordionButton>
                                <WalletBar wallet={wallet} />
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel position="relative">
                                <Button
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                    }}
                                    variant="signInButton"
                                    size="sm"
                                    onClick={() => {
                                        console.log('hello')
                                    }}
                                >
                                    buy another stock
                                </Button>
                                <WalletTable wallet={wallet} />
                            </AccordionPanel>
                        </AccordionItem>
                    ))}
                </Skeleton>
            </Accordion>
        </DetailsBox>
    )
}
