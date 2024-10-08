// export type Any =
//   | object
//   | unknown[]
//   | string
//   | number
//   | null
//   | undefined
//   | boolean;
export type CameInValue = { [key: string]: unknown };

export function deepEqual<T extends object>(obj1: T, obj2: T): boolean {
  if (isObject(obj1) && isObject(obj2)) {
    if (!isBothObjectsArrayOrObj(obj1, obj2)) return false;

    const keys1: string[] = Object.keys(obj1);
    const keys2: string[] = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key: string): boolean => {
      if (!keys2.includes(key)) return false;
      const value1 = obj1[key as keyof T];
      const value2 = obj2[key as keyof T];
      if (value1 === value2) return true;
      return deepEqual(value1 as T, value2 as T);
    });
  } else {
    return false;
  }
}

function isObject(value: object): boolean {
  return value !== null && typeof value === "object";
}
function isObjArr(obj: object): boolean {
  return isObject(obj) && Array.isArray(obj);
}
function isBothObjectsArrayOrObj(obj1: object, obj2: object): boolean {
  return (
    (isObjArr(obj1) && isObjArr(obj2)) || (!isObjArr(obj1) && !isObjArr(obj2))
  );
}
