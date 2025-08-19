import { http, HttpResponse } from 'msw'

export const handlers = [
  http.post('/api/auth/login', async () => {
    return HttpResponse.json({
      token: 'fake-test-token',
      user: {
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      }
    })
  }),
  
  // Add more handlers as needed
]
