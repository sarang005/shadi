/** Unwrap backend { success, message, data } envelope */
export const unwrapApiResponse = (body) =>
  body?.success && body?.data !== undefined ? body.data : body;

export const getApiErrorMessage = (error, fallback = 'Request failed') =>
  error?.response?.data?.message || error?.message || fallback;
