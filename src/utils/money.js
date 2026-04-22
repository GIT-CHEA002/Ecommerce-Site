function formatMoney(amountCent) {
  return `$${(amountCent / 100).toFixed(2)}`;
}
export default formatMoney;
