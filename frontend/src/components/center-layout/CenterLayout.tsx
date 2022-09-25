import { Box, BoxProps } from '@chakra-ui/react'

export function CenterLayout({ children, ...rest }: BoxProps) {
    return (
        <Box
            maxWidth="1280px"
            margin="0 auto"
            width="100%"
            maxHeight="100vh"
            px={2}
            {...rest}
        >
            {children}
        </Box>
    )
}
