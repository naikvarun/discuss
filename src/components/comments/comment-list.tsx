import CommentShow from "@/components/comments/comment-show";
import {CommentWithAuthor, fetchCommentForPost} from "@/db/queries/comment-query";

interface CommentListProps {
  postId: string;
}

export default async  function CommentList({postId}: CommentListProps) {
  const comments = await fetchCommentForPost(postId)
  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        postId={postId}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">All {comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
