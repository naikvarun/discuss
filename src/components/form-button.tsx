'use client';

import {Button} from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {Loader} from "lucide-react";

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({children}: FormButtonProps) {
  const {pending} = useFormStatus()
  console.log(`pending ${pending} pending`)
  return <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending} >
    {
      pending && <Loader className="animate-spin mr-2" />
    }
    {children}
  </Button>;
}
