export const sameArray = (arr1, arr2) => {
  return arr1.length === arr2.length && arr1.every(v => arr2.indexOf(v) > -1);
};

/**
 * Deep Check if two object is same or not
 *
 * @param {*} obj1
 * @param {*} obj2
 */
export default function deepCompareObj(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }

  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);

  // compare keys first
  if (!sameArray(obj1Keys, obj2Keys)) return false;

  return obj1Keys.every(key => {
    if (Array.isArray(obj1[key])) {
      if (!sameArray(obj1[key], obj2[key])) {
        return false;
      }
    } else if (typeof obj1[key] === 'object') {
      return deepCompareObj(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }

    return true;
  });
}
