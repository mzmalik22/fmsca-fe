export function serialToDate(serial: number | undefined, system = "1900") {
  if (!serial) return;

  const baseDate = new Date(1900, 0, 1); // January 1, 1900
  const offset = system === "1904" ? -1462 : 0; // 1904 system has an offset

  // Convert the serial number to days
  const days = serial - 1 + offset;

  // Add the days to the base date
  return new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);
}

let timeoutId: NodeJS.Timeout;

export function debounce(cb: Function, delay: number) {
  return (...args: any) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}
