import {Post} from "@prisma/client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
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
        <BreadcrumbPage >{slug}</BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
}
