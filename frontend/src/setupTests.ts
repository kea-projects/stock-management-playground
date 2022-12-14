// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import { server } from './mock-api/server'
// import ResizeObserver from 'resize-observer-polyfill'

beforeAll(() => {
    // global.ResizeObserver = ResizeObserver
    window.matchMedia = (query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })
    window.scrollTo = jest.fn()
})
beforeEach(() => server.listen())
afterEach(() => server.close())
afterAll(() => jest.clearAllMocks())
