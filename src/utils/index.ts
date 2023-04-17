export * as typeUtils from "./type";
export * from "./http";
export * from "./storage";
export * from "./url";

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
