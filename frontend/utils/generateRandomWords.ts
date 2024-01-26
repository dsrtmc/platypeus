import { generateWord } from "@/utils/generateWords";

export function generateRandomWords(wordList: string[], count: number): string[] {
  const words = [];
  for (let i = 0; i < count; i++) {
    words.push(generateWord(wordList));
  }
  return words;
}
