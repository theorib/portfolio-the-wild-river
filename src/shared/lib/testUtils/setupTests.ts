// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom/vitest'

import mockNextFont from './mockNextFontGoogle'
import mockNextImage from './mockNextImage'

mockNextFont(['Rubik_Scribble', 'Inter'])

beforeAll(() => {
  vi.mock('next/image', () => mockNextImage)
  vi.mock('next/font/google', () => () => mockNextFont(['Raleway']))
})

beforeEach(() => {
  // All your beforeEach code here
})

afterEach(() => {
  // All your afterEach code here
})

afterAll(() => {
  // All your afterAll code here
})
