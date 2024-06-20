import {Post} from "@prisma/client";
import {db} from "@/db";

export type PostWithData = Post & {
  topic: { slug: string },
  _count: { comments: number },
 user: { name: string |null}
}

export function fetchPostByTopicSlug(slug: string)  {
  return db.post.findMany({
    where: {
      topic: {slug}
    },
    include: {
      topic: {select: {slug: true}},
     _count: {select: {comments: true}},
     user: {select: {name: true}}
    }
  });
}
