export function checkObjectProps<T extends Record<string, unknown>>(
  data: unknown,
  properties: (keyof T)[]
): data is T {
  if (typeof data !== "object" || data === null) return false;

  for (const prop of properties) {
    if (!(prop in data)) return false;
  }

  return true;
}
