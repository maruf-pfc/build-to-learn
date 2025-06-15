import { getBlogBySlug, getAllBlogs, getRelatedBlogs } from "@/lib/blog"
import { BlogLayout } from "@/components/blog-layout"
import { notFound } from "next/navigation"

interface BlogPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const blogs = await getAllBlogs()
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export async function generateMetadata({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    return {
      title: "Blog Not Found",
    }
  }

  return {
    title: blog.title,
    description: blog.description,
    keywords: blog.keywords.join(", "),
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: [blog.image],
      url: `https://buildtolearn.com/blog/${blog.slug}`,
    },
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogBySlug(params.slug)

  if (!blog) {
    notFound()
  }

  const relatedBlogs = await getRelatedBlogs(blog.slug, blog.keywords)

  return <BlogLayout blog={blog} relatedBlogs={relatedBlogs} />
}
