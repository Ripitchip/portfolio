import { Project, posts, projects } from "#site/content";
import { PostItem } from "@/components/post-item";
import { ProjectItem } from "@/components/project-item";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getAllTags,
  getElementByTagSlugP,
  getElementByTagSlug,
  sortTagsByCount,
} from "@/lib/utils";
import { slug } from "github-slugger";
import { TagPageProps } from "./page";

export function TagPageProject({ params }: TagPageProps) {
  const { tag } = params;
  const title = tag.split("-").join(" ");

  const publishedProjectsOrdered: Array<Project> = projects;
  const allProjects: Array<Project> = getElementByTagSlugP(
    publishedProjectsOrdered,
    tag,
  );
  const displayPosts: Array<Project> = allProjects.filter(
    (project) => project.published,
  );
  const tags: Record<string, number> = getAllTags(projects);
  const sortedTags: string[] = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl capitalize">
            {title}
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-3 mt-8">
        <div className="col-span-12 col-start-1 sm:col-span-8">
          <hr />
          {displayPosts?.length > 0 ? (
            <ul className="flex flex-col">
              {displayPosts.map((post) => {
                const {
                  slug,
                  date,
                  title,
                  description,
                  tags,
                  img,
                  writers,
                  link,
                } = post;
                return (
                  <li key={slug}>
                    <ProjectItem
                      slug={slug}
                      date={date}
                      title={title}
                      description={description}
                      tags={tags}
                      img={img}
                      writers={writers}
                      link={link}
                    />
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Nothing to see here yet</p>
          )}
        </div>
        <Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {sortedTags?.map((t) => (
              <Tag tag={t} key={t} count={tags[t]} current={slug(t) === tag} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
