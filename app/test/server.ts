import { setupServer } from 'msw/node'
import { beforeAll, beforeEach, afterAll, afterEach } from 'vitest'
import { http } from 'msw'

const server = setupServer()

const baseHandlers = [
  http.post('https://scg.golfcanada.ca/connect/token', async () => {
    return new Response('Unhandled request')
  })
]

beforeAll(() => {
  server.listen({
    onUnhandledRequest: 'error'
  })
})

beforeEach(() => {
  server.use(...baseHandlers)
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => server.close())

export { server }
