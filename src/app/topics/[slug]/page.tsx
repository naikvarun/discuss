import CreatePostForm from "@/components/posts/create-post-form";
import PostList from "@/components/posts/post-list";
import {fetchPostByTopicSlug} from "@/db/queries/post-query";

interface TopicShowPageProps {
  params: {
    slug: string
  }
}

export default function TopicShowPage({params}: TopicShowPageProps){
  const { slug } = params
  return <div className="grid grid-cols-4 gap-4 p-4">
    <div className="col-span-3">
      <h1 className="text-xl font-bold mb-2">{slug}</h1>
      <PostList fetchPosts={() => fetchPostByTopicSlug(slug)} />
    </div>
    <div>

      <CreatePostForm slug={slug}/>

    </div>
  </div>
}
