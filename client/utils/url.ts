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
