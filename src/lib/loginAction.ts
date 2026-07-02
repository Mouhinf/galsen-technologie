'use server';

import { signIn } from '@/lib/auth';

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    return { success: true, error: null };
  } catch (error: any) {
    if (error?.type === 'CredentialsSignin') {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }
    return { success: false, error: 'Une erreur est survenue' };
  }
}
