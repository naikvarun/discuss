"use client";

import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import * as actions from "@/actions";
import {Textarea} from "@/components/ui/textarea";
import FormButton from "@/components/form-button";
import {Button} from "@/components/ui/button";
import {useForm} from "react-hook-form";
import {createCommentSchema, CreateCommentSchema} from "@/components/comments/commet-schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {FormControl, FormField, FormItem, Form, FormMessage} from "@/components/ui/form";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  const form =useForm<CreateCommentSchema>({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: ""
    }
  })

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);
  const renderError = (field: string, errors: string[] | undefined) => {
    if (!errors) {
      return null
    }
    return <>
      {errors.map((error, i) => (<FormMessage key={`error-${field}-${i}`}>{error}</FormMessage>))}
    </>
  }
  const formView = (
    <Form {...form}>


    <form action={action} ref={ref}>
      <FormField control={form.control} render={({field}) => (
        <FormItem>
          <FormControl>
            <Textarea {...field} placeholder="Enter your comment here" />
          </FormControl>
            { renderError('content', formState.errors.content) }
            { renderError('_form', formState.errors.content) }

        </FormItem>
      )} name="content">

      </FormField>
      <div className="mt-2">
      <FormButton >Create Comment</FormButton>
      </div>
    </form>
    </Form>
  );

  return (
    <div>
      <Button className="sm mb-2" variant="ghost" onClick={() => setOpen(!open)}>
        Reply
      </Button>
      {open && formView}
    </div>
  );
}
