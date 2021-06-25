import dayjs from "dayjs"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sortByDateDesc = (array: any[], key?: string) => {
  return key
    ? [...array].sort((a, b) => dayjs(b[key]).unix() - dayjs(a[key]).unix())
    : [...array].sort((a, b) => dayjs(b).unix() - dayjs(a).unix())
}
