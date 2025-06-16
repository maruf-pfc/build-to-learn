import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"
import Link from "next/link"
import { getAllTags } from "@/lib/blog"

export default async function AllTagsPage() {
  const tags = await getAllTags()

  // Group tags by first letter
  const groupedTags = tags.reduce(
    (acc, tag) => {
      const firstLetter = tag.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(tag)
      return acc
    },
    {} as Record<string, typeof tags>,
  )

  const sortedLetters = Object.keys(groupedTags).sort()

  return (
    <main>
      <PageHeader
        title="All Tags"
        description={`Explore all ${tags.length} tags to find content that interests you`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "All Tags" }]}
      />

      <ContentSection className="bg-white">
        <div className="grid gap-8">
          {sortedLetters.map((letter) => (
            <div key={letter}>
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-4 border-b border-gray-200 pb-2">
                {letter}
              </h2>
              <div className="flex flex-wrap gap-3">
                {groupedTags[letter].map((tag) => (
                  <Link key={tag.slug} href={`/blog/tag/${tag.slug}`}>
                    <Badge
                      variant="outline"
                      className="px-4 py-2 text-sm hover:bg-blue-100 hover:text-blue-800 hover:border-blue-300 cursor-pointer transition-colors"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag.name} ({tag.count})
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentSection>
    </main>
  )
}
