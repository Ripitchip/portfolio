import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me",
  description: "Information about me",
};

export default async function AboutPage() {
  return (
    <div className="container max-w-6xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-x-4">
          <h1 className="inline-block font-black text-4xl lg:text-5xl">
            About Me
          </h1>
        </div>
      </div>
      <hr className="my-8" />
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="min-w-48 max-w-48 flex flex-col gap-2  mt-0 mb-0">
          <Image
            src="/images/avatars/thomas.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="overflow-hidden rounded-full min-w-48 max-w-16"
          />
          <h2 className="text-2xl font-bold text-center break-words">
            {siteConfig.author}
          </h2>
          <p className="text-muted-foreground text-center break-words">
            Software Developer
          </p>
        </div>
        <div className="text-muted-foreground text-lg py-4 flex flex-col gap-2">
          <p className="flex">
            Welcome to my portfolio! I'm Thomas, a passionate learner across
            various fields. As an SRE intern, I dive into topics like
            Kubernetes, DevOps, and AI. I love exploring and sharing knowledge.
          </p>
          <p className="flex">
            My curiosity has led me to Kubernetes, fascinated by its container
            orchestration, and AI with its incredible applications. As an SRE
            intern, I ensure the reliability and performance of IT systems,
            working with development and operations teams.
          </p>
          <p className="flex">
            I believe in the power of knowledge-sharing. Here, you'll find my
            projects, thoughts, and discoveries. Hope you enjoy and get
            inspired!
          </p>
        </div>
      </div>
    </div>
  );
}
