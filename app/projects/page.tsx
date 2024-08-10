import { projects, Project, authors } from "#site/content";
import { ProjectItem } from "@/components/project-item";
import { QueryPagination } from "@/components/query-pagination";
import { Tag } from "@/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllTags, sortElement, sortTagsByCount } from "@/lib/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  description: "Hope this projects will make you happy",
};

const PROJECT_PER_PAGE = 4;

interface ProjectPageProps {
  searchParams: {
    page?: string;
  };
}

export default async function ProjectPage({ searchParams }: ProjectPageProps) {
  const currentPage = Number(searchParams?.page) || 1;
  const publishedProjectsOrdered: Array<Project> = projects
    .filter((project) => project.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalPages = Math.ceil(
    publishedProjectsOrdered.length / PROJECT_PER_PAGE,
  );

  const displayProjects: Array<Project> = publishedProjectsOrdered.slice(
    PROJECT_PER_PAGE * (currentPage - 1),
    PROJECT_PER_PAGE * currentPage,
  );

  const tags = getAllTags(projects);
  const sortedTags = sortTagsByCount(tags);

  return (
    <div className="container max-w-4xl  py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-12">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            My Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            Hope this projects will make you happy
          </p>
        </div>
      </div>
      <hr className="mb-4" />
      <div className="flex justify-center mt-0">
        <div className="w-full mx-auto">
          {displayProjects?.length > 0 ? (
            <ul className="grid gap-10 grid-cols-1 sm:grid-cols-2">
              {displayProjects.map((project) => {
                const {
                  slug,
                  date,
                  title,
                  description,
                  tags,
                  img,
                  writers,
                  link,
                } = project;
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
          <QueryPagination
            totalPages={totalPages}
            className="justify-end mt-4"
          />
        </div>
      </div>
    </div>
  );
}
