'use server'
 
import { redirect } from 'next/navigation'
 
export async function redirectAction(path:string) {
  redirect(path) 
}