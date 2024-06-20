import {Post} from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import paths from "@/path";
interface PostBreadcrumbs {
  slug: string
}
export default function PostsBreadcrumbs({ slug }: PostBreadcrumbs) {
  return <Breadcrumb>
    <BreadcrumbList>
      <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbLink href={paths.topicShowPath(slug)}>{slug}</BreadcrumbLink>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
}
