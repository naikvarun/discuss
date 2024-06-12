'use server'

import {z} from 'zod';

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
        description? : string[]
    }
}

export async function createTopic(formState: CreateTopicFormState, formData: FormData): Promise<CreateTopicFormState> {
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
    return {
        errors: {}
    }
}
