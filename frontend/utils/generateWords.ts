export function generateWords(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    let length = Math.random() * 5;
    let word = "";
    for (let i = 0; i < length; i++) {
      word += String.fromCharCode(97 + Math.random() * 26);
    }
    words.push(word);
  }
  return words;
}
