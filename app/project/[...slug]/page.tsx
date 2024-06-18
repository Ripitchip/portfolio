import { projects } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ProjectPageProps {
	params: {
		slug: string[];
	};
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
	const slug = params?.slug?.join("/");
	const project = projects.find((project) => project.slugAsParams === slug);

	return project;
}

export async function generateMetadata({
	params,
}: ProjectPageProps): Promise<Metadata> {
	const project = await getProjectFromParams(params);

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

export async function generateStaticParamsProject(): Promise<
	ProjectPageProps["params"][]
> {
	return projects.map((project) => ({ slug: project.slugAsParams.split("/") }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
	const project = await getProjectFromParams(params);

	if (!project || !project.published) {
		notFound();
	}

	return (
		<article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
			<h1 className="mb-2">{project.title}</h1>
			<div className="flex gap-2 mb-2">
				{project.tags?.map((tag) => (
					<Tag tag={tag} key={tag} />
				))}
			</div>
			<p>{project.link}</p>
			{project.description ? (
				<p className="text-xl mt-0 text-muted-foreground">
					{project.description}
				</p>
			) : null}
			<div className=" m-1 flex flex-row items-center space-x-2">
				{project.authors.map((author) => (
					<div key={author} className="flex flex-row items-center">
						<Avatar key={author}>
							<Link href={`https://github.com/${author}`}>
								<AvatarImage
									loading="eager"
									src={`https://github.com/${author}.png`}
								/>
								<AvatarFallback>
									{author.slice(0, 2).toUpperCase()}
								</AvatarFallback>
							</Link>
						</Avatar>
					</div>
				))}
			</div>
			<hr className="my-4" />
			<MDXContent code={project.body} />
		</article>
	);
}
