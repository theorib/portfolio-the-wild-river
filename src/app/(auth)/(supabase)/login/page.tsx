import LoginForm from '@/features/auth/components/LoginForm';
import Logo from '@/features/logo/components/Logo';
import { $path } from 'next-typesafe-url';
import Link from 'next/link';

export default function LoginPage() {
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Link
					href={$path({
						route: '/login',
					})}
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex flex-col items-center justify-center rounded-md">
						<Logo logoSize={80} />
						<p className="sr-only">The Wild River</p>
					</div>
				</Link>
				<LoginForm />
			</div>
		</div>
	);
}
