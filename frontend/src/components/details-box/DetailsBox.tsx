import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'

interface DetailsBoxProps {
    children: ReactNode
}

export function DetailsBox({ children }: DetailsBoxProps) {
    return (
        <Box bg={'contentBoxColor'} m={10} p={3} borderRadius={5}>
            {children}
        </Box>
    )
}
