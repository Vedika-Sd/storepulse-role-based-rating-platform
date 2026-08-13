import type { ApiError } from "../types";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("storepulse_token");
  let response: Response;
  try {
    response = await fetch(`${API_URL}${path}`, { ...options, headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  } catch {
    throw new Error(`Cannot reach the backend at ${API_URL}. Start it with npm.cmd run dev from the backend folder.`);
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = data as ApiError;
    const validationMessages = error.errors ? Object.values(error.errors).flat().filter(Boolean) : [];
    throw new Error(validationMessages.join(" ") || error.message || "Something went wrong. Please try again.");
  }
  return data as T;
}
