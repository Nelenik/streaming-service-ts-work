export function shuffleArray<T>(income: T[]): T[] {
  const incomeCopy = [...income];
  for (let i = incomeCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [incomeCopy[i], incomeCopy[j]] = [incomeCopy[j], incomeCopy[i]];
  }
  return incomeCopy;
}
