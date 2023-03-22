export * as typeUtils from "./type";
export * from "./http";
export * from "./storage";

export const queryString = {
  stringify: (obj: Record<string, any>): string => {
    const queryObj = Object.entries(obj).map(
      ([key, value]) => key.toLowerCase() + "=" + encodeURIComponent(value)
    );
    return queryObj.join("&");
  },
  parse: (str: string): Record<string, any> => {
    const obj: Record<string, any> = {};
    for (const [key, val] of new URLSearchParams(str)) {
      obj[key] = val;
    }
    return obj;
  },
};

export function debounce(fn: () => any, wait = 200) {
  let timer = null;
  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}

export function throttle(fn: () => any, wait = 200) {
  let timer = null;
  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }, wait);
    }
  };
}
