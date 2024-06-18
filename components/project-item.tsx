import { Calendar } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn, formatDate } from "@/lib/utils";
import { Tag } from "./tag";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProjectItemProps {
	slug: string;
	title: string;
	description?: string;
	date: string;
	tags?: Array<string>;
	img: string; // Assuming path is still a string representing a URL or file path
	authors: Array<string>;
	link: string;
}

export function ProjectItem({
	slug,
	title,
	description,
	date,
	tags,
	img,
	authors,
	link,
}: ProjectItemProps) {
	return (
		<article className="group relative flex flex-col space-y-1">
			{img && (
				<Image
					src={img}
					alt={title}
					width={600}
					height={600}
					className="rounded-md border bg-muted transition-colors"
				/>
			)}
			<h2 className="text-2xl font-extrabold">{title}</h2>
			{description && <p className="text-muted-foreground">{description}</p>}
			{date && (
				<p className="text-sm text-muted-foreground">{formatDate(date)}</p>
			)}
			<Link href={slug} className="absolute inset-0">
				<span className="sr-only">View Article</span>
			</Link>
		</article>
	);
}
