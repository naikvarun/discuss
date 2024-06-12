import TopicCreateForm from "@/components/topics/create-topic-form";

export default async function Home() {
  return (
      <div className="grid gap-4 grid-cols-4 p-4">
          <div className="col-span-3">
            <h1 className="text-xl m-2">Top Posts</h1>
          </div>
          <div>
              <TopicCreateForm />
          </div>
      </div>
  );
}
