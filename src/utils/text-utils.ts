export const pluralize = (text: string, amount: number) => {
  return amount > 1 ? text + "s" : text
}
