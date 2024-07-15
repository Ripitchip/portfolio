import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn, sortElement } from "@/lib/utils";
import { Project, posts, projects } from "#site/content";
import Link from "next/link";
import { PostItem } from "@/components/post-item";
import { ProjectItem } from "@/components/project-item";

export default function Home() {
  const latestPosts = sortElement(posts).slice(0, 5);
  const publishedProjectsOrdered: Array<Project> = projects
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:mt-10 lg:py-32">
        <div className="container flex flex-col gap-4 text-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-balance">
            Hello, I&apos;m Brioche
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground sm:text-xl text-balance">
            Welcome to my blog.
            <br />
            You can see all what I am working on!
          </p>
          <div className="flex flex-col gap-4 justify-center sm:flex-row">
            <Link
              href="/blog"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-fit")}
            >
              View my blog
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-fit",
              )}
            >
              GitHub
            </Link>
          </div>
        </div>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Projects
        </h2>
        <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2">
          {publishedProjectsOrdered.map(
            (project) =>
              project.published && (
                <li key={project.slug}>
                  <ProjectItem
                    slug={project.slug}
                    title={project.title}
                    description={project.description}
                    date={project.date}
                    tags={project.tags}
                    img={project.img}
                    writers={project.writers}
                    link={project.link}
                  />
                </li>
              ),
          )}
        </ul>
      </section>
      <section className="container max-w-4xl py-6 lg:py-10 flex flex-col space-y-6 mt-60">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-center">
          Latest Posts
        </h2>
        <ul className="flex flex-col gap-y-4">
          {latestPosts.map(
            (post) =>
              post.published && (
                <li key={post.slug}>
                  <PostItem
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    date={post.date}
                    tags={post.tags}
                    img={post.img}
                    writers={post.writers}
                  />
                </li>
              ),
          )}
        </ul>
      </section>
    </>
  );
}
