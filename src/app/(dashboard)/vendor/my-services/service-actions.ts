"use server";

import { revalidatePath } from "next/cache";
import { backendFetch } from "@/lib/backend-api";

export async function updateVendorService(formData: FormData) {
  try {
    const serviceId = String(formData.get("serviceId") || "");
    const serviceName = String(formData.get("serviceName") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = Number(formData.get("price"));
    const location = String(formData.get("location") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();

    if (!serviceId || !serviceName || !category || !description ||
        !location || !imageUrl || !Number.isFinite(price) || price <= 0) {
      return { success: false, message: "Please provide valid information." };
    }

    const result = await backendFetch<{ message: string }>(
      `/api/services/${serviceId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          serviceName, category, description, price, location,
          images: [imageUrl],
        }),
      }
    );

    revalidatePath("/vendor/my-services");
    revalidatePath("/vendor/dashboard");
    revalidatePath("/admin/services");

    return { success: true, message: result.message };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update service.",
    };
  }
}

export async function deleteVendorService(serviceId: string) {
  try {
    const result = await backendFetch<{ message: string }>(
      `/api/services/${serviceId}`,
      { method: "DELETE" }
    );

    revalidatePath("/vendor/my-services");
    revalidatePath("/vendor/dashboard");
    revalidatePath("/admin/services");

    return { success: true, message: result.message };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete service.",
    };
  }
}
