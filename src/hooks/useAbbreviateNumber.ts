export const useAbbreviateNumber = (value: number): string | number => {
  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi"];

  let newValue: number | string = value;
  let suffixNum: number = 0;

  while (newValue >= 1000 && suffixNum < suffixes.length - 1) {
    suffixNum++;
    newValue /= 1000;
  }

  if (suffixNum > 0 && suffixNum <= 1) {
    newValue = newValue.toFixed(1);
  } else if (suffixNum > 1) {
    newValue = newValue.toFixed(2);
  }

  newValue += suffixes[suffixNum];
  return newValue;
}