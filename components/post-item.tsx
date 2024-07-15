import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate, findAuthorByName } from "@/lib/utils";
import { Author, authors } from "#site/content";
import { Tag } from "./tag";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useRef, useEffect } from "react";

interface PostItemProps {
  slug: string;
  title: string;
  description?: string;
  date: string;
  tags?: Array<string>;
  img: string; // Assuming path is still a string representing a URL or file path
  writers: Array<string>;
}

export function PostItem({
  slug,
  title,
  description,
  date,
  tags,
  img,
  writers,
}: PostItemProps) {
  const myAuthors: Array<Author> = writers.map((writer) =>
    findAuthorByName(writer),
  );
  return (
    <article className="flex flex-row gap-2 align-items-center h-[200px]">
      <div className="flex hidden lg:block justify-center w-1/3 h-full">
        <Link href={`/${slug}`}>
          <img
            src={img}
            alt="Post thumbnail"
            className="rounded-lg mr-2 object-cover h-full w-full"
          />
        </Link>
      </div>
      <div className="flex flex-col border-b h-full lg:w-2/3 w-full ">
        <div className="flex items-center">
          <img
            src={img}
            alt="Post thumbnail"
            width={60}
            height={60}
            className="rounded-lg lg:hidden mr-2 object-cover h-full"
          />

          <div className="flex flex-col ">
            <h2 className="line-clamp-1  xs:text-lg sm:text-lg md:text-2xl lg:text-2xl font-bold mb-2 mt-0">
              <Link href={`/${slug}`}>{title}</Link>
            </h2>
            <div className="flex gap-2">
              {tags?.map((tag) => <Tag tag={tag} key={tag} />)}
            </div>
          </div>
        </div>
        {description && (
          <div className="max-w-none text-muted-foreground w-100%">
            <p className="line-clamp-1">{description}</p>
          </div>
        )}

        <div className="flex gap-2 mt-2">
          {myAuthors.map((author) => (
            <div key={author.name} className="flex flex-row items-center mt-0">
              <Avatar key={author.avatar}>
                <Link href={author.link}>
                  <AvatarImage loading="eager" src={author.avatar} />
                  <AvatarFallback>
                    {author.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Link>
              </Avatar>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <dl>
            <dt className="sr-only">Published On</dt>
            <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={date}>{formatDate(date)}</time>
            </dd>
          </dl>
          <Link
            href={`/${slug}`}
            className={cn(buttonVariants({ variant: "link" }), "py-0")}
          >
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
