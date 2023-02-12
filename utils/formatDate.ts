export default function FormateDateToBR(
  arg: string | Date,
  options: Intl.DateTimeFormatOptions | undefined
) {
  let date = new Date(arg);
  if (isNaN(date.getTime())) {
    console.info(
      "Falha ao converter data. Talvez esse filme não tem data de lançamento na DB"
    );
    return arg;
  }
  const f = new Intl.DateTimeFormat("pt-br", options);
  const text = f.format(date);
  return text;
}
