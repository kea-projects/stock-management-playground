import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  VStack
} from "@chakra-ui/react";
import { useGetAllWalletsMe } from '../../api/hooks/useWallets'
import { DetailsBox } from '../../components/details-box/DetailsBox'
import { WalletBar } from './wallet-bar/WalletBar'
import { WalletTable } from './wallet-table/WalletTable'
import { BuyNewStockButton } from '../stock-entity/stock-entry-transaction/buy-new-stock/buy-new-stock-button/BuyNewStockButton'
import { useParams } from 'react-router-dom'
import { CreateWallet } from './create-wallet/CreateWallet'

export function Wallets() {
    const { data } = useGetAllWalletsMe()
    let { walletId } = useParams()
    const getDefaultWalletIndex = () => {
        return  data?.map((wallet) => wallet._id).indexOf(walletId)

    }

    return (
        <VStack width="100%">
            <Accordion
                width="100%"
                allowToggle
                defaultIndex={getDefaultWalletIndex()}
            >
                {data?.map((wallet) => (
                    <AccordionItem
                        borderColor="transparent"
                        key={wallet._id}
                        my={5}
                        display="flex"
                        flexDir="column"

                    >
                        <DetailsBox width="100%">
                          <VStack alignItems="stretch"
                                  width="100%">
                            <AccordionButton>
                                <WalletBar wallet={wallet} />
                                <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel position="relative" >

                                <BuyNewStockButton
                                    walletId={wallet._id ?? '0'}
                                />
                                <WalletTable wallet={wallet} />
                            </AccordionPanel>
                          </VStack>
                        </DetailsBox>
                    </AccordionItem>
                ))}
            </Accordion>
            <CreateWallet />
        </VStack>
    )
}
