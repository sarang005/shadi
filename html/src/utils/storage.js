export const getStorageItem = (key) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota errors */
  }
};

export const removeStorageItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
};

export const getStorageJSON = (key) => {
  const raw = getStorageItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const setStorageJSON = (key, value) => {
  setStorageItem(key, JSON.stringify(value));
};
