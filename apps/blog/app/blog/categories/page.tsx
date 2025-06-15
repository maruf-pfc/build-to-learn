import { PageHeader } from "@/components/page-header"
import { ContentSection } from "@/components/content-section"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { getAllCategories } from "@/lib/blog"
import { CategoryIcon } from "@/components/category-icon"

export default async function AllCategoriesPage() {
  const categories = await getAllCategories()

  return (
    <main>
      <PageHeader
        title="All Categories"
        description={`Browse all ${categories.length} categories to find the content you're looking for`}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: "All Categories" }]}
      />

      <ContentSection className="bg-white">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.slug} href={`/blog/category/${category.slug}`}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <CategoryIcon name={category.icon} className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-blue-600 font-medium">{category.count} articles</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </ContentSection>
    </main>
  )
}
