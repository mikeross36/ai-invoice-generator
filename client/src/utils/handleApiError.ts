import { AxiosError } from "axios";

export const handleApiError = (err: unknown, defaultMsg: string) => {
  if (err instanceof AxiosError && err.response && err.response.data) {
    const errMsg = err.response.data.message || defaultMsg;
    throw new Error(errMsg);
  } else if (err instanceof Error) {
    throw new Error(err.message || defaultMsg);
  } else {
    throw new Error(defaultMsg);
  }
};
