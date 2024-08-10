import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
  img: string; // Assuming path is still a string representing a URL or file path
  writers: Array<string>;
  link: string;
}

export function ProjectItem({
  slug,
  title,
  description,
  date,
  tags,
  img,
  writers,
  link,
}: ProjectItemProps) {
  return (
    <article className="group relative flex flex-col space-y-2 p-4 h-[350px]">
      <div className="h-3/4">
        {img && (
          <img
            src={`/images/projects/${img}`}
            alt={title}
            className="rounded-lg mr-2 object-cover h-full w-full"
          />
        )}
      </div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
      {date && (
        <p className="text-sm text-muted-foreground">{formatDate(date)}</p>
      )}
      <Link href={slug} className="absolute inset-0">
        <span className="sr-only">View Article</span>
      </Link>
    </article>
  );
}
