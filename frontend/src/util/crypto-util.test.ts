import { decryptObj, encryptObj } from './crypto-util'

describe('checks if the encrypting utilities work as expected', () => {
    let encryptedString: string

    test('checks that the an object can be encrypted and properly returned as an encrypted string', () => {
        const testUserDetails = { role: 'GUEST' }
        const expectedEncryptionSignature = 'U2FsdGVkX1'

        const encryption = encryptObj(testUserDetails)
        encryptedString = encryption

        expect(encryption).toContain(expectedEncryptionSignature)
    })

    test('checks that the an object can be decrypted and properly returned as an object', () => {
        const testUserDetailsEncryption = encryptedString
        const expectedDecryption = { role: 'GUEST' }

        const decryption = decryptObj(testUserDetailsEncryption, {})

        expect(decryption).toEqual(expectedDecryption)
    })
})
