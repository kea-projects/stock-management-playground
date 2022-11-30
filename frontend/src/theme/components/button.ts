export const Button = {
    baseStyle: {
        p: '10px',
        _focus: {
            boxShadow: 'none',
        },
    },
    variants: {
        signInButton: {
            bg: '#9d9d9d',
            color: '#fefefe',
            textTransform: 'uppercase',
            _hover: {
                opacity: 1,
            },
        },
        nonStyle: {
            background: 'none',
            color: 'inherit',
            border: 'none',
            padding: 0,
            font: 'inherit',
            cursor: 'pointer',
            outline: 'inherit',
        },
    },
}
