export default async function Api(method: string, url:any, options?: RequestInit) {
  try {
    const res = await fetch(url, {
      method,
      ...options
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`API call failed:`, error.message);
    } else {
      console.error(`Unknown API error occurred`);
    }
    throw error;
  }
}