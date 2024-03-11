export default function cleanSet(set, startString) {
  const p = [];

  for (const value of set.values()) {
    if (value.startsWith(startString)) {
      const sub = value.substring(startString.length);

      if (sub && sub !== value) {
        p.push(sub);
      }
    }
  }
  return p.join('-');
}
