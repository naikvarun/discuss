import {Comment, User} from "@prisma/client";
import {db} from "@/db";

export type CommentWithAuthor = Comment & {
  user: Pick<User, 'name' | 'image'>;
}

export function fetchCommentForPost(postId: string): Promise<CommentWithAuthor[]> {
  return db.comment.findMany({
    where: {postId},
    include: {
      user: {
        select: {
          name: true,
          image: true,
        }
      }
    }
  })
}
