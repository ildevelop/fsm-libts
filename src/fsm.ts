export class FSM {
  private state: string;
  private transitions: Record<string, { on: Record<string, string> }>;

  constructor(initialState: string, transitions: Record<string, { on: Record<string, string> }>) {
    this.state = initialState;
    this.transitions = transitions;
  }

  public getState(): string {
    return this.state;
  }

  public send(event: string): void {
    const nextState = this.transitions[this.state]?.on[event];
    if (nextState) {
      this.state = nextState;
    } else {
      throw new Error(`Event '${event}' not handled in state '${this.state}'`);
    }
  }
}
