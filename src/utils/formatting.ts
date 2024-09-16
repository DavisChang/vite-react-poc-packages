import { format, formatDistanceToNow } from "date-fns";

// Function to format date using date-fns
export const formatDate = (date: Date): string => {
  return format(date, "MMMM do, yyyy"); // Example: "September 15th, 2024"
};

// Function to format "time ago" using date-fns
export const timeAgo = (date: Date): string => {
  return formatDistanceToNow(date) + " ago"; // Example: "5 days ago"
};

// Example: "$123,456.78"
export const formatCurrency = (
  amount: number,
  locale: string = "en-US",
  currency: string = "USD"
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    amount
  );
};

export const formatPercentage = (
  value: number,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, { style: "percent" }).format(value);
  // Example: "57%"
};
