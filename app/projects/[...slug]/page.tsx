import { projects } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author } from "#site/content";
import Link from "next/link";
import { findAuthorByName } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: {
    slug: string[];
  };
}
function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug.join("/");
  const project = projects.find((project) => project.slugAsParams === slug);

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = getProjectFromParams(params);

  if (!project) {
    return {};
  }

  const ogSearchParams = new URLSearchParams();
  ogSearchParams.set("title", project.title);

  return {
    title: project.title,
    description: project.description,
    authors: { name: siteConfig.author },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: project.slug,
      images: [
        {
          url: `/api/og?${ogSearchParams.toString()}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectFromParams(params);

  if (!project || !project.published) {
    notFound();
  }

  const myAuthors: Array<Author> = project.writers.map((writer) =>
    findAuthorByName(writer),
  );
  return (
    <article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h1 className="mb-2">{project.title}</h1>
          <div className="flex gap-2 mb-2">
            {project.tags?.map((tag) => <Tag tag={tag} key={tag} />)}
          </div>
          {project.description && (
            <p className="text-xl mt-0 text-muted-foreground">
              {project.description}
            </p>
          )}
          {myAuthors?.length ? (
            <div className="mt-4 flex space-x-6">
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
          <Button asChild className="mt-4">
            <Link href={project.link}>
              <ExternalLink className="mr-2 h-4 w-4" /> Visit Project
            </Link>
          </Button>
        </div>
        <img
          src={`/images/projects/${project.img}`}
          alt={project.img}
          width={250}
          height={250}
          className="mt-0 mb-0 rounded-md bg-muted transition-colors"
        />

        <div></div>
      </div>
      <hr className="my-4" />
      <MDXContent code={project.body} />
    </article>
  );
}
