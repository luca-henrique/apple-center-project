import { useState, useEffect } from "react";

/**
 * Hook oficial para aplicação de debounce em valores com delay configurável.
 * @param value Valor a ser observado
 * @param delay Tempo de espera em milissegundos (padrão 400ms)
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
