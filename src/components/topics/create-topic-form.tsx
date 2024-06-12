'use client'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

import * as actions from '@/actions';
import {z} from "zod";
import {useForm} from "react-hook-form";
import {useFormState} from 'react-dom';

import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useRef} from "react";


const createTopicSchema = z.object({
    name: z.string().trim().min(3).regex(/^[a-z-]+$/, {
        message: 'Must be lowercase with dash and no spaces'
    }),
    description: z.string().trim().min(10,
        'Longer (10) description is required')
})

export default function TopicCreateForm() {
   const [state, formAction] = useFormState(actions.createTopic, {
       errors: {}
   })
    const form = useForm<z.output<typeof createTopicSchema>>({
        resolver: zodResolver(createTopicSchema),
        defaultValues: {
            name: "",
            description: ''
        }
    })
    const formRef= useRef<HTMLFormElement>(null)

 return <Dialog>
        <DialogTrigger asChild>
            <Button>Create a Topic</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Topic</DialogTitle>
            </DialogHeader>
            <Form {...form}>
            <form ref={formRef} className="space-y-4"
                  action={formAction}
            >
                <div className="space-y-2">
                <FormField control={form.control} name="name"
                render={({field}) => (<FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input placeholder="topic-name" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>)}>

                </FormField>
                </div>
                <div className="space-y-2">
                <FormField control={form.control} name="description"
                                 render={({field}) => (<FormItem>
                                     <FormLabel>Description</FormLabel>
                                     <FormControl>
                                         <Textarea placeholder="Describe your topic here" {...field} />
                                     </FormControl>
                                     <FormMessage />
                                 </FormItem>)}>

                </FormField>
            </div>
                <Button type="submit" className="w-full">Create</Button>
            </form>
            </Form>
        </DialogContent>
    </Dialog>
}