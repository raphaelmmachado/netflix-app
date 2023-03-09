//format number to US Dollars
export default function formatToCurrency(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "usd" });
}
