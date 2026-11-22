
"use server";

import { backendFetch } from "@/lib/backend-api";
import { revalidatePath } from "next/cache";

type ServiceActionResponse = {
  success: boolean;
  message: string;
};

export async function updateServiceStatus(
  serviceId: string,
  action: "approve" | "reject"
) {
  if (!serviceId) {
    return { success: false, message: "Invalid service ID" };
  }

  try {
    const result = await backendFetch<ServiceActionResponse>(
      `/api/admin/services/${serviceId}/${action}`,
      {
        method: "PATCH",
      }
    );

    revalidateServicePages();

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update service",
    };
  }
}

export async function changeServiceStatus(
  serviceId: string,
  status: "active" | "pending" | "rejected"
) {
  if (!serviceId) {
    return { success: false, message: "Invalid service ID" };
  }

  try {
    const result = await backendFetch<ServiceActionResponse>(
      `/api/admin/services/${serviceId}/status`,
      {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }
    );

    revalidateServicePages();

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to change service status",
    };
  }
}

export async function deleteAdminService(serviceId: string) {
  if (!serviceId) {
    return { success: false, message: "Invalid service ID" };
  }

  try {
    const result = await backendFetch<ServiceActionResponse>(
      `/api/admin/services/${serviceId}`,
      {
        method: "DELETE",
      }
    );

    revalidateServicePages();

    return {
      success: result.success,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete service",
    };
  }
}

function revalidateServicePages() {
  revalidatePath("/admin/services");
  revalidatePath("/admin/dashboard");
  revalidatePath("/customer/services");
}
