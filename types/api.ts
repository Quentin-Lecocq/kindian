export type APIResponse<T> = {
  data: T | null;
  error: string | null;
  count?: number;
};
