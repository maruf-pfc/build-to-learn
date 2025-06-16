import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  if (totalPages <= 1) return null

  const getPageUrl = (page: number) => {
    if (page === 1) return baseUrl
    return `${baseUrl}?page=${page}`
  }

  const renderPageNumbers = () => {
    const pages = []
    const showPages = 5 // Number of page numbers to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    const endPage = Math.min(totalPages, startPage + showPages - 1)

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    // First page and ellipsis
    if (startPage > 1) {
      pages.push(
        <Link key={1} href={getPageUrl(1)}>
          <Button variant="outline" size="sm" className="w-10 h-10">
            1
          </Button>
        </Link>,
      )
      if (startPage > 2) {
        pages.push(
          <span key="ellipsis1" className="px-2 text-gray-500">
            ...
          </span>,
        )
      }
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link key={i} href={getPageUrl(i)}>
          <Button variant={i === currentPage ? "default" : "outline"} size="sm" className="w-10 h-10">
            {i}
          </Button>
        </Link>,
      )
    }

    // Last page and ellipsis
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="ellipsis2" className="px-2 text-gray-500">
            ...
          </span>,
        )
      }
      pages.push(
        <Link key={totalPages} href={getPageUrl(totalPages)}>
          <Button variant="outline" size="sm" className="w-10 h-10">
            {totalPages}
          </Button>
        </Link>,
      )
    }

    return pages
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      {/* Previous button */}
      {currentPage > 1 && (
        <Link href={getPageUrl(currentPage - 1)}>
          <Button variant="outline" size="sm" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
        </Link>
      )}

      {/* Page numbers */}
      <div className="flex items-center space-x-1">{renderPageNumbers()}</div>

      {/* Next button */}
      {currentPage < totalPages && (
        <Link href={getPageUrl(currentPage + 1)}>
          <Button variant="outline" size="sm" className="flex items-center">
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      )}
    </div>
  )
}
