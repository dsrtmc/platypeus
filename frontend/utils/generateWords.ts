export function generateWord(wordList: string[]): string {
  let index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
}

export function generateWords(wordList: string[], count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const word = generateWord(wordList);
    words.push(word);
  }
  return words;
}
