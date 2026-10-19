/**
 * Formata CEP para 99999-999.
 */
export function formatCEP(val: string): string {
  const clean = val.replace(/\D/g, "");
  return clean.replace(/(\d{5})(\d{0,3})/, "$1-$2").trim();
}

/**
 * Remove qualquer caractere não numérico de CEP.
 */
export function cleanCEP(val: string): string {
  return val.replace(/\D/g, "");
}
