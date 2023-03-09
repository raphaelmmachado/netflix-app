// format date to brazilian portuguese
export default function FormateDateToBR(
  arg: string | Date,
  options: Intl.DateTimeFormatOptions | undefined
) {
  let date = new Date(arg);
  if (isNaN(date.getTime())) {
    console.info("Falha ao converter data.");
    return arg;
  }
  const f = new Intl.DateTimeFormat("pt-br", options);
  const text = f.format(date);
  return text;
}
