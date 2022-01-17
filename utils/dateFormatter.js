import dateFormat from "dateformat";

export function getFormattedDate(timestamp) {
  const dateTime = new Date(timestamp?.toDate());
  const currentYear = new Date().getFullYear();
  if (currentYear !== dateTime.getFullYear()) {
    return `${dateFormat(dateTime, "dd mmmm, yyyy")} at ${dateFormat(
      dateTime,
      "h:MM TT"
    )}`;
  }
  const isRecent = dateFormat(dateTime, "DDDD");
  if (isRecent === "Today" || isRecent === "Yesterday") {
    return `${isRecent} at ${dateFormat(dateTime, "h:MM TT")}`;
  }
  return `${dateFormat(dateTime, "dd mmmm")} at ${dateFormat(
    dateTime,
    "h:MM TT"
  )}`;
}

export function getFullDate(timestamp) {
  const dateTime = new Date(timestamp?.toDate());
  return `${dateFormat(dateTime, "dddd, dd mmmm yyyy")} at ${dateFormat(
    dateTime,
    "H:MM"
  )}`;
}
