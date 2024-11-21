export function abbreviateNumber(value: number) {
  if (value >= 1e9) {
    return (value / 1e9).toFixed(1).replace(/\.0$/, "") + "b";
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return value;
}
