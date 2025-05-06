export function formatCurrency(priceCents) {
  return (priceCents * 0.01).toFixed(2)
}

export default formatCurrency