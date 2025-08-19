import { setupServer } from 'msw/node'
import { handlers } from './handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  // Enable API mocking
  server.listen()
})

afterEach(() => {
  // Reset handlers between tests
  server.resetHandlers()
})

afterAll(() => {
  // Clean up
  server.close()
})
