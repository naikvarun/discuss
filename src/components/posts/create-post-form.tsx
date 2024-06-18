'use client';
import * as actions from '@/actions'
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import FormButton from "@/components/form-button";
import {useFormState} from "react-dom";
import {FormProps, useForm} from "react-hook-form";
import {CreatePostSchema, postSchema} from "@/components/posts/post-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRef} from "react";
import {FormControl, Form, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";

interface CreatePostFormProps {
  slug: string
}
export default function CreatePostForm({slug}: CreatePostFormProps) {
  const [state, formAction] = useFormState(actions.createPost.bind(null, slug), {
    errors: {}
  })
  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  })
  const formRef = useRef<HTMLFormElement>(null);

  const renderError = (field: string, errors: string[] | undefined) => {
    if (!errors) {
      return null
    }
    return <>
      {errors.map((error, i) => (<FormMessage key={`error-${field}-${i}`}>{error}</FormMessage>))}
    </>
  }
  return <Dialog>
    <DialogTrigger asChild>
      <Button>Create Post</Button>
    </DialogTrigger>
    <DialogContent>
      <Form {...form}>
        <form ref={formRef}
              action={formAction}
              className="space-y-4"
        >
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
          </DialogHeader>

          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Title</FormLabel><FormControl>
              <Input placeholder="Your post title" {...field} />
            </FormControl>
              {renderError('title', state.errors.title)}

            </FormItem>
          )} name="title" control={form.control}/>

          <FormField render={({field}) => (
            <FormItem>
              <FormLabel>Content</FormLabel><FormControl>
              <Textarea placeholder="Your post title" {...field} />
            </FormControl>
              {renderError('content', state.errors.content)}
            </FormItem>
          )} name="content" control={form.control}/>

          {renderError('form', state.errors._form)}
          <FormButton>Create</FormButton>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
}
