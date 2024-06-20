import Link from 'next/link';
import paths from '@/path';
import {PostWithData} from "@/db/queries/post-query";


interface PostListProps {
  fetchPosts: () => Promise<PostWithData[]>;
}
// TODO: Get list of posts into this component somehow
export default async  function PostList({fetchPosts}: PostListProps) {
  const posts = await fetchPosts()
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <Link key={post.id} href={paths.postShow(topicSlug, post.id)}  >
          <div className="rounded-lg border w-full flex flex-col gap-1 p-3 hover:bg-accent">
            <div className="flex items-center justify-between">
            <span  className="font-semibold">{post.title}</span>
            <span className="text-muted-foreground text-xs">{post._count.comments} comments</span>
            </div>
            <span className="text-xs">By {post.user.name}</span>
          </div>
      </Link>
    );
  });

  return <div className="grid grid-cols-1 gap-3">{renderedPosts}</div>;
}
