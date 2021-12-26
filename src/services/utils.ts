export const loadFromLocalStorage = (key: string): Record<string, unknown> | undefined => {
  try {
    const serialised = localStorage.getItem(key);
    if (serialised === null) return undefined;
    return JSON.parse(serialised);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
};

export const saveToLocalStorage = (key: string, data: unknown): void => {
  try {
    const serialisedState = JSON.stringify(data);
    localStorage.setItem(key, serialisedState);
  } catch (e) {
    console.warn(e);
  }
};
