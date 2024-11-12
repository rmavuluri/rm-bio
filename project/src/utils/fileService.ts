// Browser-compatible storage service
export const readJsonFile = <T>(filename: string): T => {
  try {
    const data = localStorage.getItem(filename);
    return data ? JSON.parse(data) : { posts: [], projects: [] };
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return { posts: [], projects: [] } as T;
  }
};

export const writeJsonFile = <T>(filename: string, data: T): void => {
  try {
    localStorage.setItem(filename, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    throw error;
  }
};