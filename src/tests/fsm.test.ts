// tests/fsm.test.ts
import { FSM } from '../fsm';
import { initSchemaMock, initStateMock } from '../fsmMock';

describe('FSM Library', () => {
  let fsm: FSM;

  beforeEach(() => {
    // Set up the FSM with an initial state and transitions before each test
    fsm = new FSM(initStateMock, initSchemaMock);
  });

  it('should start in the initial state', () => {
    expect(fsm.getState()).toBe(initStateMock);
  });

  it('should transition from idle to loading on FETCH event', () => {
    fsm.send('FETCH');
    expect(fsm.getState()).toBe('loading');
  });

  it('should transition from loading to success on SUCCESS event', () => {
    fsm.send('FETCH');
    fsm.send('SUCCESS');
    expect(fsm.getState()).toBe('success');
  });

  it('should transition from loading to error on FAILURE event', () => {
    fsm.send('FETCH');
    fsm.send('FAILURE');
    expect(fsm.getState()).toBe('error');
  });

  it('should transition from error to loading on RETRY event', () => {
    fsm.send('FETCH');
    fsm.send('FAILURE');
    fsm.send('RETRY');
    expect(fsm.getState()).toBe('loading');
  });

  it('should throw an error for an invalid event', () => {
    expect(() => fsm.send('INVALID_EVENT')).toThrowError();
  });

  it('should throw an error if the event is not valid for the current state', () => {
    expect(() => fsm.send('SUCCESS')).toThrowError();
  });

  it('should reset to idle from success on RESET event', () => {
    fsm.send('FETCH');
    fsm.send('SUCCESS');
    fsm.send('RESET');
    expect(fsm.getState()).toBe(initStateMock);
  });
});
