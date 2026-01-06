export const sessionStorage = {
  get: <T = any>(key: string, defaultValue?: T): T | null => {
    if (typeof window === 'undefined') return defaultValue ?? null;
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue ?? null;
    } catch (error) {
      console.error(`Error reading sessionStorage key "${key}":`, error);
      return defaultValue ?? null;
    }
  },

  set: <T = any>(key: string, value: T): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      window.sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
      return false;
    }
  },

  remove: (key: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      window.sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing sessionStorage key "${key}":`, error);
      return false;
    }
  },

  clear: (): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      window.sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  },
};
