export function getLocalStorageItem(key: string): unknown {
  if (key.length === 0) {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);

  if (rawValue == null || rawValue.length === 0) {
    return null;
  }

  return JSON.parse(rawValue);
}

export function setLocalStorageItem<T extends object>(key: string, value: T) {
  if (key.length === 0) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}
