import { extendTheme } from '@chakra-ui/react'
import { Button } from './components/button'
import { Link } from './components/link'

export const theme = extendTheme({
    colors: {
        mainBackgroundColor: '#202020',
        defaultTextColor: '#fefefe',
        layerBackgroundColor: '#434343',
        hyperLinkColor: '#289BF6',
    },
    components: { Button, Link },
    styles: {
        global: () => ({
            body: {
                bg: 'mainBackgroundColor',
                color: 'defaultTextColor',
            },
        }),
    },
})
