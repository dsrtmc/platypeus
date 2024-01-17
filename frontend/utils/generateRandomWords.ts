import { generateWord } from "@/utils/generateWords";

export function generateRandomWords(count: number): string[] {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(generateWord());
  }
  return words;
}
