'use server'
import * as auth from '@/auth';
import {redirect} from "next/navigation";
import paths from '@/path'
import {revalidatePath} from "next/cache";
export async function signIn() {
  return auth.signIn('github')
}

export async function signOut() {
    console.log('Signing out')
   await auth.signOut();
   const homePath= paths.homePage();
   revalidatePath(homePath)
   redirect(homePath)
}
