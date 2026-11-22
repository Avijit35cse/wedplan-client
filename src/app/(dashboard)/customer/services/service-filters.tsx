
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Search, SlidersHorizontal, Tags } from "lucide-react";

const fieldClass =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/10";

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

    const query = params.toString();
    router.push(`/customer/services${query ? `?${query}` : ""}`);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <label className="min-w-0">
        <span className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink">
          <Search className="size-3.5 text-gold" />
          Search services
        </span>
        <input
          type="search"
          placeholder="What are you looking for?"
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => updateFilter("search", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="min-w-0">
        <span className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink">
          <Tags className="size-3.5 text-gold" />
          Category
        </span>
        <input
          type="text"
          placeholder="e.g. Photography"
          defaultValue={searchParams.get("category") || ""}
          onChange={(e) => updateFilter("category", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="min-w-0">
        <span className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink">
          <MapPin className="size-3.5 text-gold" />
          Location
        </span>
        <input
          type="text"
          placeholder="Enter a location"
          defaultValue={searchParams.get("location") || ""}
          onChange={(e) => updateFilter("location", e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="min-w-0">
        <span className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide text-ink">
          <SlidersHorizontal className="size-3.5 text-gold" />
          Sort by
        </span>
        <select
          value={searchParams.get("sort") || "newest"}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className={fieldClass}
        >
          <option value="newest">Newest first</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </label>
    </div>
  );
}
