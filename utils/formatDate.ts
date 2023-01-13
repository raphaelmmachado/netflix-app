export default function FormateDateToBR(arg: string | number | Date) {
  let date = new Date(arg);
  if (isNaN(date.getTime())) {
    console.warn(
      "Falha ao converter data. Talvez esse filme não tem data de lançamento na DB"
    );
    return arg;
  }
  const f = new Intl.DateTimeFormat("pt-br", {
    dateStyle: "short",
  });
  const text = f.format(date);
  return text;
}
