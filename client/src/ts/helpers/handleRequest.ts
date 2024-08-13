export async function handleRequest<T>(
  request: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const { data } = await request();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
}
