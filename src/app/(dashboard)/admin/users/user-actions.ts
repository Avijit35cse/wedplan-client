"use server";

import { backendFetch } from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

type UserActionResponse = {
  success: boolean;
  message: string;
};

export async function updateUserStatus(
  userId: string,
  action: "block" | "unblock"
) {
  if (!userId) {
    return { success: false, message: "Invalid user ID" };
  }

  try {
    const result = await backendFetch<UserActionResponse>(
      `/api/admin/users/${userId}/${action}`,
      {
        method: "PATCH",
      }
    );

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update user",
    };
  }
}