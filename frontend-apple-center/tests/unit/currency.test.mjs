import { describe, it } from "node:test";
import assert from "node:assert";

// Function mirrors src/shared/lib/format/currency.ts
function formatCurrency(value, options = { includeCents: false }) {
  if (isNaN(value)) return "R$ 0";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: options.includeCents ? 2 : 0,
    maximumFractionDigits: options.includeCents ? 2 : 0,
  }).format(value);
}

describe("formatCurrency unit tests", () => {
  it("formats integer value to BRL without cents by default", () => {
    const res = formatCurrency(5499);
    assert.ok(res.includes("5.499"));
    assert.ok(res.includes("R$"));
  });

  it("formats value to BRL with cents when requested", () => {
    const res = formatCurrency(5499.5, { includeCents: true });
    assert.ok(res.includes("5.499,50"));
  });

  it("safely handles NaN values", () => {
    assert.strictEqual(formatCurrency(NaN), "R$ 0");
  });
});
