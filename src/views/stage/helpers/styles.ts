export function convertNumberToPercentage(
  value: number,
  maxValue: number
): string {
  const percentage = Math.max(Math.round((value / maxValue) * 100), 0);
  if (value === maxValue) {
    return "100%";
  }
  return `${percentage}%`;
}

export function getColorByHp(value: string): string {
  const array = value.split("%");
  const num = parseInt(array[0]);
  if (num > 80) {
    return "rgba(21,140,61)";
  } else if (num > 50) {
    return "rgba(94, 128, 33)";
  } else if (num > 25) {
    return "rgba(224, 151, 40)";
  } else if (num > 1) {
    return "rgba(204, 37, 37)";
  } else {
    return "";
  }
}
