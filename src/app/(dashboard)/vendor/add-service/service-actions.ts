
"use server";

import { revalidatePath } from "next/cache";
import { backendFetch } from "@/lib/backend-api";

type UploadResponse = {
  success: boolean;
  message: string;
  imageUrl: string;
};

export async function uploadServiceImage(formData: FormData) {
  try {
    const result = await backendFetch<UploadResponse>(
      "/api/upload/image",
      {
        method: "POST",
        body: formData,
      }
    );

    return {
      success: result.success,
      message: result.message,
      imageUrl: result.imageUrl,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Image upload failed",
      imageUrl: "",
    };
  }
}

export async function createServiceAction(formData: FormData) {
  try {
    const serviceName = String(formData.get("serviceName") || "").trim();
    const category = String(formData.get("category") || "").trim();
    const description = String(formData.get("description") || "").trim();
    const price = Number(formData.get("price"));
    const location = String(formData.get("location") || "").trim();
    const imageUrl = String(formData.get("imageUrl") || "").trim();

    if (
      !serviceName ||
      !category ||
      !description ||
      !location ||
      !imageUrl ||
      !Number.isFinite(price) ||
      price <= 0
    ) {
      return { success: false, message: "Please provide all required fields." };
    }

    const result = await backendFetch<{ message: string }>("/api/services", {
      method: "POST",
      body: JSON.stringify({
        serviceName,
        category,
        description,
        price,
        location,
        images: [imageUrl],
      }),
    });

    revalidatePath("/vendor/dashboard");
    revalidatePath("/vendor/add-service");
    revalidatePath("/vendor/my-services");
    revalidatePath("/admin/services");

    return {
      success: true,
      message: result.message || "Service submitted successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create service.",
    };
  }
}
