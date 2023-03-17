export const getClassBuiltIn = (value: unknown): string => {
  return Object.prototype.toString.call(value).slice(8, -1);
};

export const isString = (value: unknown): value is string => {
  return typeof value === "string";
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === "number";
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === "boolean";
};

export const isFunction = (value: unknown): value is (...args: any) => any => {
  return typeof value === "function";
};

export const isArray = (value: unknown): value is Array<any> => {
  return Array.isArray(value);
};

export const isObject = (value: unknown): value is Record<any, any> => {
  return getClassBuiltIn(value) === "Object";
};

export const isDate = (value: unknown): value is Date => {
  return getClassBuiltIn(value) === "Date";
};

export const isRedExp = (value: unknown): value is RegExp => {
  return getClassBuiltIn(value) === "RegExp";
};

export const isPromise = (value: unknown): value is Promise<any> => {
  return getClassBuiltIn(value) === "Promise";
};

export const isEmptyString = (value: unknown, trim = true) => {
  if (trim) {
    value = String(value).trim();
  }
  return value === "";
};

export const isEmptyObject = (value: Record<any, any>) => {
  try {
    return Reflect.ownKeys(value).length === 0;
  } catch (e) {
    return false;
  }
};

export const isEmpty = (value: unknown) => {
  if (value !== null && value !== undefined) {
    if (isString(value)) {
      return isEmptyString(value);
    } else if (isArray(value)) {
      return value.length === 0;
    } else if (isObject(value)) {
      return isEmptyObject(value);
    } else {
      return false;
    }
  }
  return true;
};
