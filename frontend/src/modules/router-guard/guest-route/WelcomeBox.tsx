import { HStack, Text, VStack, Link, Box, Image } from '@chakra-ui/react'

export function WelcomeBox() {
    return (
        <HStack h="100%" justifyContent="center">
            <VStack
                backgroundColor="layerBackgroundColor"
                p={5}
                justifyContent="center"
                borderRadius={5}
            >
                <Image
                    borderRadius="full"
                    boxSize="150px"
                    src="/random_image_can_be_changed.jpg"
                    alt="random-picture"
                />
                <Text fontSize="xl">Stocks change my life</Text>
                <Box>Welcome to the stock management playground!</Box>
                <Box>
                    Here you can practice your stock exchange skills without
                    risking your own money paycheck
                </Box>
                <Box>
                    We are trying to keep our platform as accurate as possible
                    to the real stock market
                </Box>
                <p />
                <Box>Created By:</Box>
                <HStack gap={5}>
                    <Link href="https://github.com/CristiPV" target="_blank">
                        Cristian Valentin Purcea
                    </Link>
                    <Link href="https://github.com/ithai5" target="_blank">
                        Itai Gramse
                    </Link>
                </HStack>
            </VStack>
        </HStack>
    )
}
