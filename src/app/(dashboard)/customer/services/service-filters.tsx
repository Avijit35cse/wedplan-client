
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ServiceFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/customer/services?${params.toString()}`);
  }

  return (
    <div className="my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <input
        placeholder="Search services..."
        defaultValue={searchParams.get("search") || ""}
        onChange={(e) => updateFilter("search", e.target.value)}
        className="rounded-lg border px-4 py-2"
      />

      <input
        placeholder="Category"
        defaultValue={searchParams.get("category") || ""}
        onChange={(e) => updateFilter("category", e.target.value)}
        className="rounded-lg border px-4 py-2"
      />

      <input
        placeholder="Location"
        defaultValue={searchParams.get("location") || ""}
        onChange={(e) => updateFilter("location", e.target.value)}
        className="rounded-lg border px-4 py-2"
      />

      <select
        defaultValue={searchParams.get("sort") || "newest"}
        onChange={(e) => updateFilter("sort", e.target.value)}
        className="rounded-lg border px-4 py-2"
      >
        <option value="newest">Newest First</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
}
