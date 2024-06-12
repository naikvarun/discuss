'use server'
import * as auth from '@/auth';
import {redirect} from "next/navigation";
import paths from '@/path'
export async function signIn() {
  return auth.signIn('github')
}

export async function signOut() {
   await auth.signOut();
   redirect(paths.homePage())
}
