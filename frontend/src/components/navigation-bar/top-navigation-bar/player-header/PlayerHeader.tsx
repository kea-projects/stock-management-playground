import { useContext } from 'react'
import { UserContext } from '../../../../provider/user-provider/UserProvider'
import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Button,
    Text,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { UserKeys } from '../../../../api/hooks/useUser'
import { WalletsKeys } from '../../../../api/hooks/useWallets'
import { routes } from '../../../../routes'
import { useNavigate } from 'react-router-dom'

interface PlayerHeaderProps {
    fullName: string
}

export function PlayerHeader({ fullName }: PlayerHeaderProps) {
    const { setUserDetail } = useContext(UserContext)
    const queryClient = useQueryClient()
    const navigation = useNavigate()

    const logout = async () => {
        await queryClient.invalidateQueries([
            UserKeys.userMeKey,
            WalletsKeys.singleWalletMe,
            WalletsKeys.allWalletsMe,
        ])
        setUserDetail({})
        navigation(routes.homepage)
        navigation(0)
    }
    return (
        <Box position="relative">
            <Accordion allowToggle={true}>
                <AccordionItem borderColor="transparent" maxW="200px">
                    <AccordionButton
                        bg="HeaderBoxColor"
                        py={2}
                        _hover={{ bg: 'HeaderBoxColor' }}
                    >
                        <Text>{fullName}</Text>
                        <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel
                        bg="HeaderBoxColor"
                        position="absolute"
                        width="full"
                        p={0}
                    >
                        <Button
                            onClick={() => logout()}
                            cursor="pointer"
                            variant="nonStyle"
                        >
                            Log Out
                        </Button>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </Box>
    )
}
