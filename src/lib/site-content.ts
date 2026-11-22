import { homeImages } from "@/lib/images";

/**
 * Names match the categories accepted by the services API so the homepage
 * links filter the directory correctly.
 */
export const serviceCategories = [
  {
    name: "Photography & Videography",
    label: "Photography",
    description: "Storytelling that lasts well beyond the day.",
    image: homeImages.categories.photography,
  },
  {
    name: "Wedding Venues",
    label: "Wedding venues",
    description: "Gardens, halls and settings made for gathering.",
    image: homeImages.categories.venues,
  },
  {
    name: "Decoration & Florist",
    label: "Decor & florals",
    description: "Considered details, from the aisle to the table.",
    image: homeImages.categories.florist,
  },
  {
    name: "Catering Services",
    label: "Catering",
    description: "Menus and settings your guests will remember.",
    image: homeImages.categories.catering,
  },
  {
    name: "Makeup & Styling",
    label: "Makeup & styling",
    description: "A look that still feels entirely like you.",
    image: homeImages.categories.makeup,
  },
  {
    name: "Wedding Fashion",
    label: "Wedding fashion",
    description: "Dresses, suits and finishing touches.",
    image: homeImages.categories.fashion,
  },
] as const;

export const planningPaths = [
  {
    name: "The Ceremony",
    tagline: "For the moment you say I do.",
    description:
      "Begin with the setting, the flowers and the photographs that hold the moment together.",
    includes: [
      "Wedding venues",
      "Decoration and florals",
      "Photography and videography",
    ],
    featured: false,
  },
  {
    name: "The Celebration",
    tagline: "For the party that follows.",
    description:
      "Bring the table, the menu and the music together for an evening that feels effortless.",
    includes: [
      "Catering services",
      "Wedding venues",
      "Photography and videography",
    ],
    featured: true,
  },
  {
    name: "The Whole Day",
    tagline: "For every detail, start to finish.",
    description:
      "A complete starting point across all six categories, tracked from one dashboard.",
    includes: [
      "All six service categories",
      "Venue, styling and catering",
      "One place to manage requests",
    ],
    featured: false,
  },
] as const;

export const planningSteps = [
  {
    title: "Discover",
    description:
      "Browse admin-approved services by category, location and price, then shortlist the ones that feel right.",
  },
  {
    title: "Request",
    description:
      "Send your event date, location and a short note directly to the vendor from the service page.",
  },
  {
    title: "Celebrate",
    description:
      "Track every request, acceptance and confirmation from your customer dashboard in one place.",
  },
] as const;
