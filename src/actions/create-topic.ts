'use server'

import {z} from 'zod';
import {auth} from "@/auth";
import {db} from "@/db";
import {redirect} from "next/navigation";
import paths from "@/path";
import {Topic} from "@prisma/client";
import {revalidatePath} from "next/cache";

const createTopicSchema = z.object({
    name: z.string().min(3).regex(/^[a-z-]+$/, {
        message: 'Must be lowercase with dash and no spaces'
    }),
    description: z.string().min(10,
    'Longer (10) description is required')
})

interface CreateTopicFormState {
    errors: {
        name?: string[],
        description? : string[],
        _form?: string[]
    }
}

export async function createTopic(prevState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {

  //TODO: Validate home page
    const result = createTopicSchema.safeParse({
        name: formData.get('name'),
        description: formData.get('description')
    })
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const session = await auth();
    if(!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to create a form']
            }
        }
    }
    let topic: Topic;
    try {
        topic = await db.topic.create({
            data : {
                slug: result.data.name,
                description: result.data.name
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
    revalidatePath('/')
    redirect(paths.topicShowPath(topic.slug))
}
