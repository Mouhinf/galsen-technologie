'use server';

import { signIn } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(formData: FormData) {
  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      redirect('/admin/login?error=1');
    }
    redirect('/admin/login?error=2');
  }
  redirect('/admin');
}
