// jest.setup.ts
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'node:util'

if (!global.TextEncoder) {
  global.TextEncoder = TextEncoder
}

if (!global.TextDecoder) {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder
}

