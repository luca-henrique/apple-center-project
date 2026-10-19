/**
 * Formata número de telefone brasileiro para (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.
 */
export function formatPhone(val: string): string {
  const clean = val.replace(/\D/g, "");

  if (clean.length <= 10) {
    return clean.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  }

  return clean.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
}

/**
 * Remove qualquer caractere não numérico de telefone.
 */
export function cleanPhone(val: string): string {
  return val.replace(/\D/g, "");
}
