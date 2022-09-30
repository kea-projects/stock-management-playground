import CryptoJS from 'crypto-js'

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY || ''

export const encryptObj = (obj: unknown): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(obj), ENCRYPTION_KEY).toString()
}

export const decryptObj = <T>(objEncrypted: string, expectedObject: T): T => {
    const bytes = CryptoJS.AES.decrypt(objEncrypted, ENCRYPTION_KEY)
    expectedObject = { ...JSON.parse(bytes.toString(CryptoJS.enc.Utf8)) }
    return expectedObject
}
