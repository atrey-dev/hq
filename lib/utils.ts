export function cn(
  ...inputs: Array<string | number | boolean | null | undefined | Record<string, boolean>>
): string {
  const tokens: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string' || typeof input === 'number') {
      tokens.push(String(input));
    } else if (typeof input === 'object') {
      for (const key of Object.keys(input)) {
        if ((input as Record<string, boolean>)[key]) tokens.push(key);
      }
    }
  }
  return tokens.join(' ');
}


