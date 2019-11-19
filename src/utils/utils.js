export function shuffle(array) {
  const endIndex = array.length - 2;
  for (let i = 0; i < endIndex; i++) {
    const j = i + Math.floor(Math.random() * (array.length - i));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}