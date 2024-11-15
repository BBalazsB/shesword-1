export const getCurrencySymbol = (currency) => {
  const symbols = {
    GBP: '£',
    EUR: '€',
    USD: '$',
    AUD: 'A$',
    CAD: 'C$',
    JPY: '¥',
    CNY: '¥',
    INR: '₹',
    // Add more as needed
  };
  return symbols[currency] || currency;
}; 