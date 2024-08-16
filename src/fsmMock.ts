export const initSchemaMock = {
  idle: { on: { FETCH: 'loading' } },
  loading: { on: { SUCCESS: 'success', FAILURE: 'error' } },
  success: { on: { RESET: 'idle' } },
  error: { on: { RETRY: 'loading' } },
};

export const initStateMock = 'idle';
