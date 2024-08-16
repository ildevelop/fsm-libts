# FSM Library

## Overview

`fsm-libts` is a lightweight, TypeScript-based Finite State Machine (FSM) library designed to help manage state transitions in a predictable and maintainable way. It’s perfect for use in JavaScript or TypeScript projects, including React applications.

## Installation

You can install the `fsm-libts` via npm:

```bash
npm install fsm-libts
```

If you are using Yarn:

```bash
yarn add fsm-libts
```

## Usage

### Basic Example

Here's how you can create and use an FSM in your project:

```js
import { FSM } from 'fsm-libts';

// Define your state machine
const fsm = new FSM('idle', {
  idle: { on: { FETCH: 'loading' } },
  loading: { on: { SUCCESS: 'success', FAILURE: 'error' } },
  success: { on: { RESET: 'idle' } },
  error: { on: { RETRY: 'loading' } },
});

// Check the initial state
console.log(fsm.getState()); // Outputs: 'idle'

// Send an event to transition states
fsm.send('FETCH');
console.log(fsm.getState()); // Outputs: 'loading'

// Handle success
fsm.send('SUCCESS');
console.log(fsm.getState()); // Outputs: 'success'

// Reset the state
fsm.send('RESET');
console.log(fsm.getState()); // Outputs: 'idle'
```

## Tests

The code is fully unit tested. Additonally, all code has been vetted using (TypeScript).

```bash
 npm run test
```

## API Reference

The `FSM` class is the core of the `fsm-libts`. It allows you to define states, transitions, and handle state changes.

`constructor(initialState: string, transitions: TransitionMap)`

- `initialState`: The state the FSM should start in.
- `transitions`: An object defining the possible state transitions.
- `getState(): string`
  Returns the current state of the FSM.
- `send(event: string): void`
  Sends an event to the FSM, which triggers a state transition if the event is valid for the current state.

### Example:

```ts
const fsm = new FSM('idle', {
  idle: { on: { START: 'running' } },
  running: { on: { STOP: 'idle' } },
});

fsm.send('START');
console.log(fsm.getState()); // Outputs: 'running'
```

## License [MIT]

This project is licensed under the MIT License. See the LICENSE file for details.
