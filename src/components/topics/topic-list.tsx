import {db} from "@/db";
import Link from "next/link";
import paths from "@/path";
import {Badge} from "@/components/ui/badge";

export default async function TopicList() {
  const topics = await db.topic.findMany();

  const renderedTopic = topics.map((topic) => {
    return <Link key={topic.id} href={paths.topicShowPath(topic.slug)} className="">
        <Badge variant="secondary">{topic.slug}</Badge>
      </Link>

  })

  return <div className="flex gap-3">
    {renderedTopic}
  </div>
}
