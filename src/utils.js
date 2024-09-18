export const initialItems = new Array(100000).fill(0).map((_, i) => {
  return {
    id: i,
    isSelected: i === 9999,
  };
});

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};
