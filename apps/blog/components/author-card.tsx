import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Github, Globe } from "lucide-react"

interface AuthorDetails {
  name: string
  bio: string
  avatar: string
  role: string
  social: {
    twitter?: string
    linkedin?: string
    github?: string
    website?: string
  }
}

interface AuthorCardProps {
  author: AuthorDetails
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-start space-x-6">
          <img
            src={author.avatar || "/placeholder.svg"}
            alt={author.name}
            className="w-20 h-20 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-poppins font-bold text-xl text-gray-900 mb-1">{author.name}</h3>
            <p className="text-blue-600 font-medium mb-3">{author.role}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{author.bio}</p>
            <div className="flex items-center space-x-3">
              {author.social.twitter && (
                <Button variant="outline" size="sm" asChild>
                  <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {author.social.linkedin && (
                <Button variant="outline" size="sm" asChild>
                  <a href={author.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {author.social.github && (
                <Button variant="outline" size="sm" asChild>
                  <a href={author.social.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                  </a>
                </Button>
              )}
              {author.social.website && (
                <Button variant="outline" size="sm" asChild>
                  <a href={author.social.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
