import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Post, Project } from "#site/content";
import { slug } from "github-slugger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function sortElement(elements: Array<Post | Project>) {
  return elements.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });
}

export function getAllTags(elements: Array<Post | Project>) {
  const tags: Record<string, number> = {};
  elements.forEach((element) => {
    if (element.published) {
      element.tags?.forEach((tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      });
    }
  });
  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a]);
}

export function getElementByTagSlug(
  elements: Array<Post | Project>,
  tag: string,
) {
  return elements.filter((element) => {
    if (!element.tags) return false;
    const slugifiedTags = element.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}

export function getElementByTagSlugP(elements: Array<Project>, tag: string) {
  return elements.filter((element) => {
    if (!element.tags) return false;
    const slugifiedTags = element.tags.map((tag) => slug(tag));
    return slugifiedTags.includes(tag);
  });
}
