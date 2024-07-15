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
    <article className="container py-6 prose dark:prose-invert max-w-4xl mx-auto">
      <div className="flex flex-row gap-2 align-items-center h-[200px]">
        <div className="flex flex-col h-full lg:w-2/3 w-full ">
          <div className="flex items-center">
            <img
              src={post.img}
              alt="Post thumbnail"
              width={60}
              height={60}
              className="rounded-lg lg:hidden md:hidden mr-2 object-cover h-full"
            />

            <div className="flex flex-col ">
              <h1 className="text-2xl font-bold mb-2 mt-0">{post.title}</h1>
              <div className="flex gap-2">
                {post.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
              </div>
            </div>
          </div>
          {post.description ? (
            <p className="line-clamp-1 text-xl mt-0 mb-1 text-muted-foreground">
              {post.description}
            </p>
          ) : null}
          {myAuthors?.length ? (
            <div className="flex space-x-6">
              {myAuthors.map((author) =>
                author ? (
                  <div key={author.name} className="flex items-center  text-sm">
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
                        <HoverCardTrigger href={`https://github.com/${author}`}>
                          <p className="font-medium mt-0 mb-0">{author.name}</p>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div
                            key={author.name}
                            className="flex items-center  text-sm"
                          >
                            <Avatar>
                              <AvatarImage
                                loading="eager"
                                src={`https://github.com/${author}.png`}
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
        <div className="h-full md:block lg:block hidden ">
          <img
            src={post.img}
            alt={post.img}
            className="rounded-lg mr-2 object-cover h-auto w-full mt-0 mb-0"
          />
        </div>
      </div>
      <hr className="my-4" />
      <MDXContent code={post.body} />
    </article>
  );
}
