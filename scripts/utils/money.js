export function formatCurrency(priceCents) {
  return (priceCents * 0.01).toFixed(2)
}