export function parseCSV(csvText) {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const cells = line.split(',').map(c => c.trim());
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = cells[i];
    });
    return obj;
  });
}