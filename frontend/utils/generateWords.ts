export function generateWord(): string {
  let length = Math.random() * 5;
  const words = ["try", "wish", "break", "volcano", "tired", "brave", "light"];
  // let word = "";
  // for (let i = 0; i < length; i++) {
  //   word += String.fromCharCode(97 + Math.random() * 26);
  // }
  return words[Math.floor(Math.random() * words.length)];
}

export function generateWords(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    const word = generateWord();
    words.push(word);
  }
  return words;
}
