'use client';

import {Button} from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import {Loader} from "lucide-react";

interface FormButtonProps {
  children: React.ReactNode;
}

export default function FormButton({children}: FormButtonProps) {
  const {pending} = useFormStatus()
  return <Button type="submit" className="w-full">
    {
      pending && <Loader />
    }
    {children}
  </Button>;
}
