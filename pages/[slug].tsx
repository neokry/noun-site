import {
  GetStaticPropsContext,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { promises as fs } from "fs";
import path from "path";
import Layout from "@/components/Layout";

export const getStaticPaths = async () => {
  const templateDirectory = path.join(process.cwd(), "templates");
  const files = await fs.readdir(templateDirectory, { withFileTypes: true });
  const paths = files
    .filter((dirent) => dirent.isFile())
    .map((file) => ({
      params: {
        slug: file.name.replace(/\.md?$/, ""),
      },
    }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (
  ctx: GetStaticPropsContext<{ slug: string }>
): Promise<
  GetStaticPropsResult<{
    data: MDXRemoteSerializeResult<Record<string, unknown>>;
  }>
> => {
  console.log("ctx", ctx);
  const { slug } = ctx.params!;
  const templateDirectory = path.join(process.cwd(), "templates");
  const source = await fs.readFile(`${templateDirectory}/${slug}.md`, "utf8");
  const mdxSource = await serialize(source, { parseFrontmatter: true });

  return {
    props: {
      data: mdxSource,
    },
    revalidate: 60,
  };
};

export default function SiteComponent(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = props;
  const align = data.frontmatter?.align;

  const getAlignment = () => {
    switch (align) {
      case "center":
        return "text-center flex flex-col items-center";
      case "right":
        return "text-right";
      default:
        return "";
    }
  };
  return (
    <Layout>
      <div
        className={`h-full ${getAlignment()} w-full wrapper focus:outline-none pt-12 p-6 sm:px-52 prose prose-skin prose-headings:font-heading prose-xl max-w-none`}
      >
        <MDXRemote {...data} />
      </div>
    </Layout>
  );
}
