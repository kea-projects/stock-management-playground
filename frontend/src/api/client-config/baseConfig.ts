import { Configuration } from '../client'

export const BaseConfig = new Configuration({
    basePath:
        process.env.NODE_ENV !== 'test' ? process.env.REACT_APP_API_URL : '',
})
