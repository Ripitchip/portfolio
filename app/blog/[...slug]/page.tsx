import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";
import Image from "next/image";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { findAuthorByName } from "@/lib/utils";
import { Author } from "#site/content";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostFromParams(params: PostPageProps["params"]) {
  const slug = params?.slug?.join("/");
  const post = posts.find((post) => post.slugAsParams === slug);

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params);

  if (!post) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", post.title);

  return {
    title: post.title,
    description: post.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: post.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<
  PostPageProps["params"][]
> {
  return posts.map((post) => ({ slug: post.slugAsParams.split("/") }));
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params);

  if (!post || !post.published) {
    notFound();
  }
  const myAuthors: Array<Author> = post.writers.map((writer) =>
    findAuthorByName(writer),
  );

  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="mb-2 sm:text-md xs:text-md line-clamp-3">
            {post.title}
          </h1>
          {post.description && (
            <p className="line-clamp-4 xs:text-md sm:text-md text-xl mt-0 mb-0 text-muted-foreground">
              {post.description}
            </p>
          )}
          <div className="flex gap-2 mb-2 mt-3">
            {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
          </div>
          <div className="flex-col">
            {myAuthors?.length ? (
              <div className="mt-0 flex space-x-6">
                {myAuthors.map((author) =>
                  author ? (
                    <div
                      key={author.name}
                      className="flex items-center  text-sm"
                    >
                      <Link
                        href={author.link}
                        className="rounded-2xl p-3 mt-0 mb-0 flex items-center text-sm"
                      >
                        <Avatar>
                          <AvatarImage loading="eager" src={author.avatar} />
                          <AvatarFallback>
                            {author.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </Link>
                      <div className="flex-1 mt-0 mb-0 text-left leading-tight">
                        <HoverCard>
                          <HoverCardTrigger href={author.link}>
                            <p className="font-medium mt-0 mb-0">
                              {author.name}
                            </p>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div
                              key={author.name}
                              className="flex items-center  text-sm"
                            >
                              <Avatar>
                                <AvatarImage
                                  loading="eager"
                                  src={author.link}
                                />
                                <AvatarFallback>
                                  {author.name.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <p className="font-medium mt-0 mb-0">
                                {author.name}
                              </p>
                              <p className="font-medium mt-0 mb-0">
                                {author.name}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                        <p className="text-[12px] mt-0 mb-0 text-muted-foreground">
                          @{author.name}
                        </p>
                      </div>
                    </div>
                  ) : null,
                )}
              </div>
            ) : null}
          </div>
        </div>
        <img
          src={`/images/posts/${post.img}`}
          alt={post.img}
          className="object-contain mt-0 mb-0 rounded-md bg-muted transition-colors w-full max-h-[20em]"
        />
      </div>
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
