export function assertInteger(
  input: number,
  error: ErrorConstructor = Error,
  message: string = "input must be integer",
): asserts input {
  if (!Number.isInteger(input)) throw new error(message);
}
