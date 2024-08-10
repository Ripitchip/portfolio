import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { rehypeGithubAlerts } from "rehype-github-alerts";
import { transformerCopyButton } from '@rehype-pretty/transformers'
import rehypeMermaid from 'rehype-mermaid'

const computedFields = <T extends { slug: string }>(data: T) => ({
  ...data,
  slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
  name: "Post",
  pattern: "blog/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      img: s.string(),
      writers: s.array(s.string()),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const projects = defineCollection({
  name: "Project",
  pattern: "projects/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      title: s.string().max(99),
      description: s.string().max(999).optional(),
      date: s.isodate(),
      published: s.boolean().default(true),
      tags: s.array(s.string()).optional(),
      img: s.string(),
      writers: s.array(s.string()),
      link: s.string(),
      body: s.mdx(),
    })
    .transform(computedFields),
});

const authors = defineCollection({
  name: "Author",
  pattern: "authors/**/*.mdx",
  schema: s
    .object({
      slug: s.path(),
      name: s.string(),
      avatar: s.string(),
      link: s.string(),
    })
    .transform(computedFields),
});


const rehypePrettyCodeOptions: Options = {
  theme: 'one-dark-pro',
  onVisitLine(node: LineElement) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    }
};
export default defineConfig({
  root: "./content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { posts, projects, authors },
  mdx: {
    rehypePlugins: [
      rehypeMermaid,
      rehypeSlug,
      rehypeGithubAlerts,
      [rehypePrettyCode,rehypePrettyCodeOptions],
          // transformers: [
          //   transformerCopyButton({
          //     visibility: 'always',
          //     feedbackDuration: 2_500,
          //   }),
          // ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
    remarkPlugins: [],
  },
});
