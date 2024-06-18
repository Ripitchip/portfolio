import { projects, Project } from "#site/content";
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
		<div className="container max-w-4xl py-6 lg:py-10">
			<div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
				<div className="flex-1 space-y-4">
					<h1 className="inline-block font-black text-4xl lg:text-5xl">
						My Projects
					</h1>
					<p className="text-xl text-muted-foreground">
						Hope this projects will make you happy
					</p>
				</div>
			</div>
			<div className="grid grid-cols-12 gap-3 mt-8">
				<div className="col-span-12 col-start-1 sm:col-span-8">
					<hr />
					{displayProjects?.length > 0 ? (
						<ul className="grid gap-10 sm:grid-cols-2">
							{displayProjects.map((project) => {
								const {
									slug,
									date,
									title,
									description,
									tags,
									img,
									authors,
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
											authors={authors}
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
				<Card className="col-span-12 row-start-3 h-fit sm:col-span-4 sm:col-start-9 sm:row-start-1">
					<CardHeader>
						<CardTitle>Tags</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-wrap gap-2">
						{sortedTags?.map((tag) => (
							<Tag tag={tag} key={tag} count={tags[tag]} />
						))}
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
