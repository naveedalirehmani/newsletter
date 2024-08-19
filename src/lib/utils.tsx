import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomTwoCharacters() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

export function timeAgo(input: string) {
  const now = new Date();
  const past = new Date(input);
  const diff = now.getTime() - past.getTime();

  const msInMinute = 60 * 1000;
  const msInHour = 60 * msInMinute;
  const msInDay = 24 * msInHour;
  const msInWeek = 7 * msInDay;
  const msInMonth = 30 * msInDay; // Rough approximation
  const msInYear = 365 * msInDay; // Rough approximation

  if (diff < msInMinute) {
    return "Just now";
  } else if (diff < msInHour) {
    const minutes = Math.floor(diff / msInMinute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < msInDay) {
    const hours = Math.floor(diff / msInHour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < msInWeek) {
    const days = Math.floor(diff / msInDay);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < msInMonth) {
    const weeks = Math.floor(diff / msInWeek);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (diff < msInYear) {
    const months = Math.floor(diff / msInMonth);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / msInYear);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

const names = [
  "Trouble",
  "Oliver",
  "Salem",
  "Willow",
  "Zoe",
  "Boo",
  "Cali",
  "Scooter",
  "Bob",
  "Oscar",
  "Sadie",
  "Tiger",
  "Lucy",
  "Gracie",
  "Princess",
  "Oreo",
  "Pepper",
  "Lucky",
  "Cuddles",
  "Bella",
];

export const getRandomProfile = () => {
  const randomIndex = Math.floor(Math.random() * names.length);
  return `https://api.dicebear.com/9.x/notionists/svg?seed=${names[randomIndex]}`;
};
