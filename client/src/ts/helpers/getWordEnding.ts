/*
функция возвращает слово с правильным окончанием в зависимости от числа, например 2 стула, 10 стульев. важно в массив endings передать правильный порядок этих слов
*/
export const getWordEndigs = (
  num: number,
  endings: [string, string, string]
): string => {
  num = Math.abs(num);
  num %= 100;
  if (num >= 11 && num <= 19) {
    return endings[2];
  }
  num %= 10;
  if (num === 1) {
    return endings[0];
  }
  if (num >= 2 && num <= 4) {
    return endings[1];
  }
  return endings[2];
};
