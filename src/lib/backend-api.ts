
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function backendFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  if (!API_URL) {
    throw new Error("Backend API URL is not configured");
  }

  const result = await auth.api.getToken({
    headers: await headers(),
  });

  if (!result?.token) {
    throw new Error("Authentication token not found");
  }

  const isFormData = options.body instanceof FormData;

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${result.token}`,
      ...(options.body && !isFormData
        ? { "Content-Type": "application/json" }
        : {}),
    },
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Backend API request failed");
  }

  return data as T;
}
