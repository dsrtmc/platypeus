export function calculateWpm(characters: number, time: number): number {
  return Math.round((characters / 5) * (60 / time));
}
