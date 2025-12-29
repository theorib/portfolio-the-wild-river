'use server';

import logger from '@/features/logger';
import { createClient } from '@/services/supabase/supabaseServer';
import paths from '@/shared/constants/paths';
import { type User } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { LoginFormDataSchema, type LoginFormData } from '@/features/auth/authSchemas';

interface LoginReturn {
	success: boolean;
	data: User | null;
	error: Error | null;
}

export async function login(loginFormData: LoginFormData): Promise<LoginReturn> {
	try {
		const supabase = await createClient();

		const { data: parsedData, error: parsingError } = LoginFormDataSchema.safeParse(loginFormData);

		if (parsingError) {
			return { success: false, data: null, error: parsingError };
		}

		const { error, data } = await supabase.auth.signInWithPassword({
			email: parsedData.email,
			password: parsedData.password,
		});

		if (error) {
			return { success: false, data: null, error };
		}

		if (data && data.session) {
			return { success: true, data: data.user, error: null };
		}

		return { success: false, data: null, error: new Error('Unexpected auth error') };
	} catch (err) {
		logger
			.withMetadata({
				function: 'login',
				loginFormData,
			})
			.withError(err)
			.error('loginFormData for user %s failed to be parsed with parsingError: %s');

		let errorMessage = 'Unexpected auth error';
		if (err instanceof Error) {
			errorMessage = err.message;
		}

		return {
			success: false,
			data: null,
			error: new Error('Unexpected auth error', {
				cause: errorMessage,
			}),
		};
	}
}
export async function signup(formData: FormData) {
	const supabase = await createClient();

	// const {
	// 	success,
	// 	data,
	// 	error: parsingError,
	// } = parseLoginData({
	// 	email: formData.get('email') as string,
	// 	password: formData.get('password') as string,
	// });

	const {
		success,
		data: parsedData,
		error: parsingError,
	} = LoginFormDataSchema.safeParse({
		email: formData.get('email') as string,

		password: formData.get('password') as string,
	});

	if (!success) {
		console.error(parsingError);
		redirect('/error');
	}

	const { error } = await supabase.auth.signUp(parsedData);

	if (error) {
		redirect('/error');
	}

	revalidatePath(paths.dashboard.pathname, 'layout');
	redirect(paths.dashboard.pathname);
}

export const logout = async () => {
	const supabase = await createClient();
	const { error } = await supabase.auth.signOut();
	if (error) {
		logger
			.withMetadata({
				function: 'logout',
			})
			.withError(error)
			.error('Error logging out user');
	}
};

export const getUser = async (): Promise<User> => {
	const supabase = await createClient();

	const { data, error } = await supabase.auth.getUser();

	if (error || !data?.user) {
		logger
			.withMetadata({
				function: 'getUser',
				supabaseData: data,
			})
			.withError(error)
			.error('Error getting user');
		redirect(paths.login.pathname);
	}

	return data.user;
};

export const validateSession = async (): Promise<void> => {
	try {
		await getUser();
	} catch (error) {
		logger
			.withMetadata({
				function: 'validateSession',
			})
			.withError(error);

		redirect(paths.login.pathname);
	}
};
