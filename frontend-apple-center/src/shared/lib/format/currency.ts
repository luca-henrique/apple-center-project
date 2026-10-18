/**
 * Formats a numeric value into Brazilian Real (BRL) currency string.
 * Example: 5899 -> "R$ 5.899,00" or custom without cents if integer.
 */
export function formatCurrency(
  value: number,
  options: { includeCents?: boolean } = { includeCents: false }
): string {
  if (isNaN(value)) return "R$ 0";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: options.includeCents ? 2 : 0,
    maximumFractionDigits: options.includeCents ? 2 : 0,
  }).format(value);
}
