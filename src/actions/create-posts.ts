'use server'

import {delay} from "@/util";
import {postSchema} from "@/components/posts/post-schema";
import {auth} from "@/auth";
import {Post, Topic} from "@prisma/client";
import {db} from "@/db";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import paths from "@/path";

interface CreatePostFormState {
  errors: {
    title?: string[],
    content? : string[],
    _form?: string[]
  }
}
export async function createPost(slug: string, prevState:  CreatePostFormState,formData: FormData):Promise<CreatePostFormState> {
  await delay(2500);
  const data = Object.fromEntries(formData)
  const result = postSchema.safeParse(data);

  if(!result.success) {
    console.log(result);
    return {
      errors : result.error.flatten().fieldErrors
    }
  }

  const session = await auth();
  if(!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to create a post']
      }
    }
  }
  let post: Post;
  try {
    const topic = await db.topic.findUnique({where: {slug: slug}});
    if(!topic) {
      return {
        errors: {
          _form: ['Cannot find topic.']
        }
      }
    }
    post = await db.post.create({
      data: {
        title: data.title.toString(),
        content: data.content.toString(),
        userId: session.user.id!,
        topicId: topic.id
      }

    })

  } catch (error: unknown) {
    if(error instanceof Error) {
      return {
        errors: {
          _form: [error.message]
        }
      }
    } else {
      return {
        errors: {
          _form: ['something went wrong']
        }
      }
    }
  }
  revalidatePath(paths.topicShowPath(slug))
  redirect(paths.postShow(slug, post.id))

}
