'use client';

import {Button} from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {Loader} from "lucide-react";
import {cn} from "@/lib/utils";

interface FormButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function FormButton({children, className}: FormButtonProps) {
  const {pending} = useFormStatus()
  console.log(`pending ${pending} pending`)
  return <Button type="submit" className={cn("w-full", className)} disabled={pending} aria-disabled={pending} >
    {
      pending && <Loader className="animate-spin mr-2" />
    }
    {children}
  </Button>;
}
