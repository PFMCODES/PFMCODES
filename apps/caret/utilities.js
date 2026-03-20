export function isMoreThanOneChange(s1, s2) {
  const len1 = s1.length;
  const len2 = s2.length;

  // 1. If length difference is > 1, they definitely have > 1 change
  if (Math.abs(len1 - len2) > 1) return true;

  let count = 0;
  let i = 0, j = 0;

  while (i < len1 && j < len2) {
    if (s1[i] !== s2[j]) {
      count++;
      if (count > 1) return true; // Exit early

      if (len1 > len2) {
        i++; // Character deleted in s2
      } else if (len1 < len2) {
        j++; // Character added in s2
      } else {
        i++; j++; // Character replaced
      }
    } else {
      i++; j++;
    }
  }

  // Check for a trailing character difference at the end
  if (i < len1 || j < len2) count++;
  
  return count > 1;
}