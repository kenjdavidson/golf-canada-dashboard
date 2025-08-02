import { configureStore } from '@reduxjs/toolkit';
import type { Store } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api as golfCanadaApi } from '../store/api';

export function setupApiStore(): { store: Store } {
  const store = configureStore({
    reducer: {
      [golfCanadaApi.reducerPath]: golfCanadaApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(golfCanadaApi.middleware),
  });

  setupListeners(store.dispatch);

  return { store };
}
