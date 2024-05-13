const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed
const day = today.getDate().toString().padStart(2, "0");

export function getToday(): string {
  const formattedDate: string = `${year}${month}${day}`;
  return formattedDate;
}

export function showToday(): string {
  const formattedDate: string = `${month}월 ${day}일`;
  return formattedDate;
}
