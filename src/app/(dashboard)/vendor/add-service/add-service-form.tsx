
"use client";

import { useState, useTransition } from "react";
import {
  createServiceAction,
  uploadServiceImage,
} from "./service-actions";

export default function AddServiceForm() {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleImageUpload(file: File) {
    setMessage("");
    setImageUrl("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    const result = await uploadServiceImage(formData);

    setIsUploading(false);
    setMessage(result.message);

    if (result.success) {
      setImageUrl(result.imageUrl);
    }
  }

  function handleSubmit(formData: FormData) {
    setMessage("");

    if (!imageUrl) {
      setMessage("Please upload a service image first.");
      return;
    }

    formData.set("imageUrl", imageUrl);

    startTransition(async () => {
      const result = await createServiceAction(formData);
      setMessage(result.message);

      if (result.success) {
        setImageUrl("");
        const form = document.getElementById(
          "add-service-form"
        ) as HTMLFormElement | null;
        form?.reset();
      }
    });
  }

  return (
    <form
      id="add-service-form"
      action={handleSubmit}
      className="max-w-2xl space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      <div>
        <label htmlFor="serviceName" className="mb-2 block font-medium">
          Service Name
        </label>
        <input
          id="serviceName"
          name="serviceName"
          required
          placeholder="e.g. Wedding Photography"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="category" className="mb-2 block font-medium">
          Category
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue=""
          className="w-full rounded-lg border px-4 py-3"
        >
          <option value="" disabled>Select a category</option>
          <option value="Photography & Videography">Photography & Videography</option>
          <option value="Wedding Venues">Wedding Venues</option>
          <option value="Decoration & Florist">Decoration & Florist</option>
          <option value="Catering Services">Catering Services</option>
          <option value="Makeup & Styling">Makeup & Styling</option>
          <option value="Wedding Fashion">Wedding Fashion</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          placeholder="Describe your wedding service..."
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="price" className="mb-2 block font-medium">
          Price (BDT)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          min="1"
          required
          placeholder="e.g. 15000"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="location" className="mb-2 block font-medium">
          Location
        </label>
        <input
          id="location"
          name="location"
          required
          placeholder="e.g. Dhaka, Bangladesh"
          className="w-full rounded-lg border px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="image" className="mb-2 block font-medium">
          Service Image
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required
          disabled={isUploading || isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              if (file.size > 5 * 1024 * 1024) {
                setMessage("Image size must be 5MB or less.");
                event.target.value = "";
                return;
              }
              handleImageUpload(file);
            }
          }}
          className="w-full rounded-lg border px-4 py-3"
        />

        {isUploading && <p className="mt-2 text-sm">Uploading image...</p>}

        {imageUrl && (
          <p className="mt-2 text-sm text-green-600">
            Image uploaded successfully!
          </p>
        )}
      </div>

      {message && (
        <p role="status" className="text-sm">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || isUploading || !imageUrl}
        className="rounded-lg bg-rose-600 px-6 py-3 font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Submitting..." : "Submit Service"}
      </button>
    </form>
  );
}
