export function capitalizeFirstLetter(string) {
   return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

// using a regular expression (/\b\w/g) to match the first character of each word in the string.
// The \b represents a word boundary, and \w matches any word character.
// The g flag ensures that all occurrences in the string are replaced.
export function capitalizeEveryWord(string) {
   return string.replace(/\b\w/g, (match) => match.toUpperCase());
}
