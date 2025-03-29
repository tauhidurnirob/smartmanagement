export function camelCaseToSentence(camelCaseString: string) {
  const words: string[] = [];
  let currentWord = '';

  for (let i = 0; i < camelCaseString.length; i++) {
      const char = camelCaseString[i];
      if (char === char.toUpperCase()) {
          words.push(currentWord);
          currentWord = char.toLowerCase();
      } else {
          currentWord += char;
      }
  }

  // Add the last word
  words.push(currentWord);

  // Capitalize the first letter of the first word
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);

  // Join the words into a sentence
  const sentence = words.join(' ');
  return sentence;
}