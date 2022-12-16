import { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface DetailsBoxProps {
    children: ReactNode
    width?: string | number | string[] | number[]
}

export function DetailsBox({ children, width }: DetailsBoxProps) {
    return (
        <Flex bg={'contentBoxColor'} p={3} borderRadius={5} width={width}>
            {children}
        </Flex>
    )
}
