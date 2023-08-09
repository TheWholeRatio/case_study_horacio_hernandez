export const validateCreditCard = (cardNumber: string): boolean => {
  const isInvalidRegex = /\D/g.test(cardNumber);

  if (cardNumber.length < 15 || isNaN(Number(cardNumber)) || isInvalidRegex) {
    return false;
  }

  let sum = 0;
  let isWeighted = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = Number(cardNumber.charAt(i));

    if (isWeighted) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isWeighted = !isWeighted;
  }

  return sum % 10 === 0;
};
