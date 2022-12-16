import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface GenericModalProps {
    isOpen: boolean
    onClose: () => void
    title?: ReactNode
    children?: ReactNode
    footer?: ReactNode
}
export function GenericModal({
    isOpen,
    onClose,
    children,
    title,
    footer,
}: GenericModalProps) {
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor="layerBackgroundColor">
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{children}</ModalBody>
                    <ModalFooter>{footer}</ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
