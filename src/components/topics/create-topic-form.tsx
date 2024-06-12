'use client';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";

import * as actions from '@/actions';
import {useFormState} from "react-dom";

export default function TopicCreateForm() {
    const [formState, action] = useFormState(actions.createTopic,{errors: {}})
    return <Dialog>
        <DialogTrigger asChild>
            <Button>Create a Topic</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create a Topic</DialogTitle>
            </DialogHeader>
            <form className="space-y-4" action={action}>
                <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input name="name" placeholder="New Topic" id="name"/>
                    {
                        formState.errors.name ?
                            <ul className="bg-red-200 p-2 border rounded border-red-400">
                                {formState.errors.name.map((e, i) => <li key={`error-name-${i}`}>{e}</li>)}
                            </ul>: null
                    }
                </div>
                <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    className="resize-none"
                    placeholder="Describe your topic here" name="description" id="description" />
                    {
                        formState.errors.description ?
                            <ul className="bg-red-200 p-2 border rounded border-red-400">
                                {formState.errors.description.map((e, i) => <li key={`error-desc-${i}`}>{e}</li>)}
                            </ul>: null
                    }
            </div>
                <Button type="submit" className="w-full">Create</Button>
            </form>
        </DialogContent>
    </Dialog>
}