import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/path";
import PostsBreadcrumbs from "@/components/posts/post-breadcrums";
import {fetchCommentForPost} from "@/db/queries/comment-query";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="space-y-3">
       <PostsBreadcrumbs slug={slug} />
      <PostShow postId={postId} />
      <div className="m-4">
      <CommentCreateForm postId={postId} startOpen  />
       <CommentList fetchData={() => fetchCommentForPost(postId)} />
      </div>
    </div>
  );
}
