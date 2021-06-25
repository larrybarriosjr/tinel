import dayjs from "dayjs"

export const pluralize = (text: string, amount: number) => {
  return amount > 1 ? text + "s" : text
}

export const displayDate = (date: string) => {
  return dayjs(date).format("D.M.YYYY.")
}

export const displayTime = (date: string) => {
  return dayjs(date).format("HH:mm[h]")
}
