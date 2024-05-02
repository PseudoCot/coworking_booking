export default function getDaysInMonth(year: number, month: number): number {
  // const presentDay = new Date();
  // const presentYear = presentDay.getFullYear();
  // const presentMonth = presentDay.getMonth();
  // return 32 - new Date(year ?? presentYear, month ?? presentMonth, 32).getDate();
  return 32 - new Date(year, month, 32).getDate();
}
