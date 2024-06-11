import {NextUIProvider} from "@nextui-org/react";
import {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({children}: ProviderProps) {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </SessionProvider>)
}
