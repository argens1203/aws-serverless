export default class StateMachineError extends Error {
  constructor(message, data) {
    super();
    this.message = message || 'state_machine_error';
    this.name = 'StateMachineError';
    this.statusCode = 402;
    this.data = data;
  }
}