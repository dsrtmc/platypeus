export function assertIsNode(e: EventTarget | null): asserts e is Node {
  // TODO: we get this error `assertIsNode` is not defined sometimes LOL
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected.`);
  }
}
