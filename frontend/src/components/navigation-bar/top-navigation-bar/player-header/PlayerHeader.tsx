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

interface PlayerHeaderProps {
    fullName: string
}

export function PlayerHeader({ fullName }: PlayerHeaderProps) {
    const { setUserDetail } = useContext(UserContext)
    const queryClient = useQueryClient()
    const logout = async () => {
        await queryClient.invalidateQueries([UserKeys.userMeKey])
        setUserDetail({})
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
