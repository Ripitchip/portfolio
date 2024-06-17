import { posts } from "#site/content";
import { MDXContent } from "@/components/mdx-components";
import { notFound } from "next/navigation";

import "@/styles/mdx.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Tag } from "@/components/tag";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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

	return (
		<article className="container py-6 prose dark:prose-invert max-w-3xl mx-auto">
			<h1 className="mb-2">{post.title}</h1>
			<div className="flex gap-2 mb-2">
				{post.tags?.map((tag) => (
					<Tag tag={tag} key={tag} />
				))}
			</div>
			{post.description ? (
				<p className="text-xl mt-0 text-muted-foreground">{post.description}</p>
			) : null}
			<div className=" m-1 flex flex-row items-center space-x-2">
				{post.authors.map((author) => (
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
			<MDXContent code={post.body} />
		</article>
	);
}
