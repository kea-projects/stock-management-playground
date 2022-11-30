import { Link, useLocation } from 'react-router-dom'
import { Box } from '@chakra-ui/react'

export interface NavigationBarLinkProps {
    destination: string
    text: string
}

export function NavigationBarLink({
    destination,
    text,
}: NavigationBarLinkProps) {
    const match = useLocation()
    const isChosenLink = match.pathname === destination
    const color = isChosenLink ? 'chosenNavigationBarColor' : ''
    const hover = match.pathname === destination ? 'default' : 'pointer'
    return (
        <Link to={destination}>
            <Box color={color} _hover={{ cursor: hover }} borderRadius="5px">
                {text}
            </Box>
        </Link>
    )
}
