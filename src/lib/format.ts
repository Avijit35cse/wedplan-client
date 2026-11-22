export function formatPrice(value: number) {
  return `৳${value.toLocaleString("en-BD")}`;
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
