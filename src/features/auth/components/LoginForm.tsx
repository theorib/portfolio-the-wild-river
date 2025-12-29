/* eslint-disable react/no-children-prop */
'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/shared/components/ui/card';

import { Field, FieldError, FieldGroup, FieldLabel } from '@/shared/components/ui/field';
import { useForm } from '@tanstack/react-form';

import { login } from '@/features/auth/actions';
import { LoginFormDataSchema } from '@/features/auth/authSchemas';
import logger from '@/features/logger';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import paths from '@/shared/constants/paths';
import { cn } from '@/shared/lib/utils';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
export default function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
	const router = useRouter();
	const form = useForm({
		formId: 'login-form',
		defaultValues: {
			email: 'user@user.com',
			password: '12345678',
		},
		validators: { onSubmit: LoginFormDataSchema, onBlur: LoginFormDataSchema },
		onSubmit: async ({ value }) => {
			try {
				const { success, error } = await login(value);

				if (error) {
					return toast.error('Invalid email or password');
				} else if (success) {
					toast.success('You have succefully logged in.');
					router.push(paths.dashboard.pathname);
				}
			} catch (err) {
				const errorMessage = 'Unknown auth error';
				logger.withError(err).error(errorMessage);

				toast.error(errorMessage);
			}
		},
	});

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Welcome back</CardTitle>
					<CardDescription>Login with your email and password</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className="grid gap-6"
						id="login-form"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							void form.handleSubmit();
						}}
					>
						<FieldGroup>
							<form.Field
								name="email"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>e-mail</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												autoComplete="username"
												type="email"
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
							<form.Field
								name="password"
								children={(field) => {
									const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
									return (
										<Field data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Password</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												aria-invalid={isInvalid}
												type="password"
												autoComplete="current-password"
											/>
											{isInvalid && <FieldError errors={field.state.meta.errors} />}
										</Field>
									);
								}}
							/>
						</FieldGroup>
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
							children={([canSubmit, isSubmitting]) => (
								<Button type="submit" disabled={!canSubmit}>
									{isSubmitting ? '...' : 'Submit'}
								</Button>
							)}
						/>
					</form>
				</CardContent>
			</Card>
			<div className="text-muted-foreground [&_a]:hover:text-primary text-center text-xs text-balance [&_a]:underline [&_a]:underline-offset-4">
				By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
				<a href="#">Privacy Policy</a>.
			</div>
		</div>
	);
}
