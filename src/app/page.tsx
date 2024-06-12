'use server'
import * as actions from '@/actions';
import {auth} from '@/auth'
import Profile from "@/components/profile";
import {Button} from "@/components/ui/button";
export default async function Home() {
  const session = await auth();
  return (<div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>

      <form action={actions.signOut}>
        <Button type="submit">SignOut</Button>
      </form>
      {
        session?.user  ? <div>
          <div className="p-4 border bg-gray-200 rounded font-mono">
            {JSON.stringify(session.user)}</div> </div> : <div>Signed out</div>
      }

      <Profile />
    </div>
  );
}
