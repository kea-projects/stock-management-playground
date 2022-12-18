import { VStack, Image, HStack, Divider, Heading, Text } from '@chakra-ui/react'
import { NavigationBarLink } from '../navigation-bar-link/NavigationBarLink'
import { routes } from '../../../routes'
import { LogoutButton } from '../logout-button/LogoutButton'

export function SideNavigationBar() {
    return (
        <VStack
            bg="contentBoxColor"
            w={'25%'}
            py={5}
            justifyContent="space-between"
        >
            <Heading
                p={3}
                fontSize="xl"
                display="flex"
                gap={4}
                alignItems="center"
            >
                <HStack>
                    <Image
                        borderRadius="full"
                        boxSize="40px"
                        src="/random_image_can_be_changed.jpg"
                        alt="main app picture"
                    />
                    <Text>Stock Market Playground </Text>
                </HStack>
            </Heading>
            <Divider />
            <VStack h="100%" alignItems="flex-start" gap={5} py={5}>
                <NavigationBarLink
                    text={'Home'}
                    destination={routes.homepage}
                />
                <NavigationBarLink
                    text={'Wallets'}
                    destination={routes.wallets}
                />
                <NavigationBarLink
                    text={'Transactions'}
                    destination={routes.transactions}
                />
                <NavigationBarLink
                    text={'Portfolio'}
                    destination={routes.portfolio}
                />
            </VStack>
            <Divider />
            <VStack alignItems="flex-start" gap={3} py={5}>
                <NavigationBarLink text={'Help'} destination={routes.help} />
                <LogoutButton />
            </VStack>
        </VStack>
    )
}
