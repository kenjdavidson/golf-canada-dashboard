import { TextEncoder, TextDecoder } from 'util';
import fetch, { Headers, Request, Response } from 'node-fetch';

class MockBroadcastChannel {
  constructor(channel: string) {}
  postMessage(message: any) {}
  close() {}
  addEventListener(type: string, listener: EventListener) {}
  removeEventListener(type: string, listener: EventListener) {}
}

Object.defineProperties(globalThis, {
  TextEncoder: { value: TextEncoder },
  TextDecoder: { value: TextDecoder },
  fetch: { value: fetch, writable: true },
  Headers: { value: Headers },
  Request: { value: Request },
  Response: { value: Response },
  BroadcastChannel: { value: MockBroadcastChannel }
});
