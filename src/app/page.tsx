import TopicCreateForm from "@/components/topics/create-topic-form";
import TopicList from "@/components/topics/topic-list";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

export default async function Home() {
  return (
      <div className="grid gap-4 grid-cols-4 p-4">
          <div className="col-span-3">
            <h1 className="text-xl m-2">Top Posts</h1>
          </div>
          <div>
            <Card>
              <CardHeader className="text-center">
                <TopicCreateForm />
              </CardHeader>
              <Separator />
              <CardContent className="p-2 flex flex-col gap-2">
                <div className="font-semibold">Order Details</div>
                <TopicList/>
              </CardContent>


            </Card>
          </div>
      </div>
  );
}
