import { HStack, Text } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import { PlayerHeader } from './player-header/PlayerHeader'

interface TopNavigationBarProps {
    fullName?: string
}
export const locationNameMapper = (pathname: string): string => {
    switch (pathname) {
        case '/':
            return 'Home'
        default:
            return ''
    }
}

export function TopNavigationBar({ fullName }: TopNavigationBarProps) {
    const location = useLocation()
    if (!fullName) return null
    return (
        <HStack w="100%" justifyContent="space-between" px={10} py={5}>
            <Text>{locationNameMapper(location.pathname)}</Text>
            <PlayerHeader fullName={fullName} />
        </HStack>
    )
}
