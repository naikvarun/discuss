'use client'
import {useSession} from "next-auth/react";
import * as actions from "@/actions";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {LogOut} from "lucide-react";
import {Avatar, AvatarImage} from "@/components/ui/avatar";

export default function HeaderAuth() {
  const session = useSession();
  if(session.status === 'loading') {
    return null
  }
  if(session.data?.user) {
    return  <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar >
          <AvatarImage src={session.data.user.image || ''} ></AvatarImage>
        </Avatar>
      </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>

      </DropdownMenuItem>
    </DropdownMenuContent>
    </DropdownMenu>
  } else {
    return <>
      <div>
        <form action={actions.signIn}>
          <Button type="submit" variant="outline" >Sign In</Button>
        </form>
      </div>
      <div>
        <form action={actions.signIn}>
          <Button type="submit" >Sing up</Button>
        </form>
      </div>
    </>
  }
}
