const config = {
  prefix: "xxx_", // project name
};

function getKey(key: string) {
  if (key) {
    return config.prefix + key;
  }
}

type storageType = "localStorage" | "sessionStorage";

function getStorage(type: storageType, key: string) {
  key = getKey(key);
  if (key) {
    const value = window[type].getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  return null;
}

function setStorage(type: storageType, key: string, value: any) {
  key = getKey(key);
  if (key) {
    value = JSON.stringify(value);
    if (value) {
      window[type].setItem(key, value);
    }
  }
}

function removeStorage(type: storageType, key: string) {
  key = getKey(key);
  if (key) {
    window[type].removeItem(key);
  }
}

function clearStorage(type: storageType) {
  window[type].clear();
}

export const localStorage = {
  get: function (key: string) {
    getStorage("localStorage", key);
  },
  set: function (key: string, value: any) {
    setStorage("localStorage", key, value);
  },
  remove: function (key: string) {
    removeStorage("localStorage", key);
  },
  clear: function () {
    clearStorage("localStorage");
  },
};

export const sessionStorage = {
  get: function (key: string) {
    getStorage("sessionStorage", key);
  },
  set: function (key: string, value: any) {
    setStorage("sessionStorage", key, value);
  },
  remove: function (key: string) {
    removeStorage("sessionStorage", key);
  },
  clear: function () {
    clearStorage("sessionStorage");
  },
};
