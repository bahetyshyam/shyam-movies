export function getYearFromDateString(dateString: string = "") {
  if (dateString === "") {
    return new Date().getFullYear();
  }
  return new Date(dateString).getFullYear();
}
