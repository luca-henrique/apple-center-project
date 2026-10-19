import { describe, it } from "node:test";
import assert from "node:assert";

function formatZipCode(value) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

function formatCpf(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

describe("formatCpf and formatZipCode unit tests", () => {
  it("formats 11 digits into standard CPF pattern", () => {
    assert.strictEqual(formatCpf("12345678901"), "123.456.789-01");
  });

  it("handles partial CPF typing progressively", () => {
    assert.strictEqual(formatCpf("1234"), "123.4");
    assert.strictEqual(formatCpf("1234567"), "123.456.7");
  });

  it("formats 8 digits into standard CEP pattern", () => {
    assert.strictEqual(formatZipCode("01310100"), "01310-100");
  });

  it("truncates extra digits past 8 for CEP", () => {
    assert.strictEqual(formatZipCode("01310100999"), "01310-100");
  });
});
