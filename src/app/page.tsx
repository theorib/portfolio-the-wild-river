import { $path } from 'next-typesafe-url';
import { redirect } from 'next/navigation';

export default function Page() {
	redirect($path({ route: '/app/dashboard' }));
}
