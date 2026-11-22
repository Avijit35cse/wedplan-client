
"use client";

import { useState, useTransition } from "react";
import {
  createServiceAction,
  uploadServiceImage,
} from "./service-actions";
import {
  ImagePlus,
  UploadCloud,
  CheckCircle2,
  LoaderCircle,
  FileText,
  Tag,
  Banknote,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function AddServiceForm() {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  async function handleImageUpload(file: File) {
    setMessage("");
    setImageUrl("");
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const result = await uploadServiceImage(formData);

      setMessage(result.message);

      if (result.success) {
        setImageUrl(result.imageUrl);
      }
    } catch {
      setMessage("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
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
      try {
        const result = await createServiceAction(formData);
        setMessage(result.message);

        if (result.success) {
          setImageUrl("");

          const form = document.getElementById(
            "add-service-form"
          ) as HTMLFormElement | null;

          form?.reset();
        }
      } catch {
        setMessage("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <form
      id="add-service-form"
      action={handleSubmit}
      className="surface-panel max-w-4xl overflow-hidden rounded-2xl border border-line bg-white shadow-sm"
    >
      <div className="border-b border-line bg-cream/50 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-rose/10 text-rose">
            <Sparkles size={21} />
          </div>
          <div>
            <h2 className="font-serif text-2xl text-ink">
              Service Information
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Add the details customers need to discover your service.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 p-6 sm:p-8">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="serviceName"
              className="flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Sparkles size={15} className="text-gold" />
              Service Name
            </label>
            <input
              id="serviceName"
              name="serviceName"
              required
              placeholder="e.g. Wedding Photography"
              className="w-full rounded-xl border border-line bg-ivory/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-rose focus:ring-2 focus:ring-rose/10"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="category"
              className="flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Tag size={15} className="text-gold" />
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              defaultValue=""
              className="w-full rounded-xl border border-line bg-ivory/50 px-4 py-3 text-sm text-ink outline-none transition focus:border-rose focus:ring-2 focus:ring-rose/10"
            >
              <option value="" disabled>
                Select a category
              </option>
              <option value="Photography & Videography">
                Photography & Videography
              </option>
              <option value="Wedding Venues">Wedding Venues</option>
              <option value="Decoration & Florist">
                Decoration & Florist
              </option>
              <option value="Catering Services">Catering Services</option>
              <option value="Makeup & Styling">Makeup & Styling</option>
              <option value="Wedding Fashion">Wedding Fashion</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="flex items-center gap-2 text-sm font-semibold text-ink"
          >
            <FileText size={15} className="text-gold" />
            Service Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            placeholder="Describe your service, what you offer and what makes it special..."
            className="w-full resize-y rounded-xl border border-line bg-ivory/50 px-4 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-rose focus:ring-2 focus:ring-rose/10"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="price"
              className="flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <Banknote size={15} className="text-gold" />
              Price (BDT)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-ink-muted">
                ৳
              </span>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                required
                placeholder="15000"
                className="w-full rounded-xl border border-line bg-ivory/50 py-3 pl-9 pr-4 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-rose focus:ring-2 focus:ring-rose/10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="location"
              className="flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <MapPin size={15} className="text-gold" />
              Location
            </label>
            <input
              id="location"
              name="location"
              required
              placeholder="e.g. Dhaka, Bangladesh"
              className="w-full rounded-xl border border-line bg-ivory/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-rose focus:ring-2 focus:ring-rose/10"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="image"
              className="flex items-center gap-2 text-sm font-semibold text-ink"
            >
              <ImagePlus size={16} className="text-gold" />
              Service Image
            </label>
            <p className="mt-1 text-xs text-ink-muted">
              Upload a high-quality image to showcase your wedding service. Maximum size: 5MB.
            </p>
          </div>

          <label
            htmlFor="image"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-5 py-9 text-center transition ${
              imageUrl
                ? "border-green-300 bg-green-50/50"
                : "border-champagne bg-ivory/50 hover:border-rose hover:bg-rose/5"
            } ${isUploading || isPending ? "cursor-not-allowed opacity-60" : ""}`}
          >
            {isUploading ? (
              <>
                <LoaderCircle className="mb-3 animate-spin text-rose" size={30} />
                <span className="text-sm font-semibold text-ink">
                  Uploading your image...
                </span>
                <span className="mt-1 text-xs text-ink-muted">
                  Please wait a moment
                </span>
              </>
            ) : imageUrl ? (
              <>
                <CheckCircle2 className="mb-3 text-green-600" size={30} />
                <span className="text-sm font-semibold text-green-700">
                  Image uploaded successfully!
                </span>
                <span className="mt-1 text-xs text-ink-muted">
                  Click here to choose another image
                </span>
              </>
            ) : (
              <>
                <UploadCloud className="mb-3 text-rose" size={32} />
                <span className="text-sm font-semibold text-ink">
                  Click to upload your service image
                </span>
                <span className="mt-1 text-xs text-ink-muted">
                  JPG, PNG or other image formats
                </span>
              </>
            )}

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
              className="sr-only"
            />
          </label>
        </div>

        {message && (
          <div
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm ${
              imageUrl && !isPending
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-rose/20 bg-rose/5 text-rose"
            }`}
          >
            {message}
          </div>
        )}

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-sm text-xs leading-5 text-ink-muted">
            Your service will be submitted for admin approval before appearing publicly.
          </p>

          <button
            type="submit"
            disabled={isPending || isUploading || !imageUrl}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-wine px-7 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <>
                <LoaderCircle size={17} className="animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Service
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
