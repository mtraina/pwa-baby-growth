export const formatDate = (d: Date) => `${padDigits(d.getDate())}.${padDigits(d.getMonth()+1)}.${d.getFullYear()} ${padDigits(d.getHours())}:${padDigits(d.getMinutes())}`

const padDigits = (n: number) => ("0" + n).slice(-2)