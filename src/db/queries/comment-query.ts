import {Comment, User} from "@prisma/client";
import {db} from "@/db";

export type CommentWithAuthor = Comment & {
  user: Pick<User, 'name' | 'image'>;
}

export const fetchCommentForPost = (postId: string): Promise<CommentWithAuthor[]> => {
  console.log('Fetching comment for post', postId);
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
