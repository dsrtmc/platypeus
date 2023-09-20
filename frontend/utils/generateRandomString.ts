export function generateRandomString(length: number, uppercase = false) {
  let string = "";
  for (let i = 0; i < Math.min(length, 50); i++) {
    if (uppercase) {
      string += String.fromCharCode(65 + Math.random() * 25);
    } else {
      string += String.fromCharCode(97 + Math.random() * 25);
    }
  }
  return string;
}
