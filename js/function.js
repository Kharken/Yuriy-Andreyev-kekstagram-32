/* 2.31. Нужно больше функций */

/* Функция для проверки длины строки */

// eslint-disable-next-line no-unneeded-ternary
const checkLength = (testingString, numberOfSymbols) =>
  // eslint-disable-next-line no-unneeded-ternary
  testingString.length <= numberOfSymbols ? true : false;
// eslint-disable-next-line no-console
console.log(checkLength('проверяемая строка', 10));

/* Функция для проверки, является ли строка палиндромом */

const isPalindrome = (testingString) => {
  // eslint-disable-next-line no-unused-vars
  let checkString = '';

  for (const symbol of testingString) {
    if (symbol !== ' ') {
      checkString += symbol;
    }
  }
  return checkString.split('').reverse().join('').toLowerCase() === checkString.toLowerCase();
};
// eslint-disable-next-line no-console
console.log(isPalindrome('Лёша на полке клопа нашёл '));


/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. */

const getNaturalNumbersFromString = function (str) {
  const acc = [];
  const arr = str.split('');
  //console.log(arr)

  for (const symb of arr) {
    switch (false) {
      case isNaN(+symb):
        acc.push(+symb);
        break;
      default:
        break;
    }
  }
  const finalArr = acc.filter((item) => item >= 0);
  return +finalArr.join('');
};
// eslint-disable-next-line no-console
console.log(getNaturalNumbersFromString('00aa56a03-4'));
