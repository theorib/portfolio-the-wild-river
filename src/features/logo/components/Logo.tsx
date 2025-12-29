import { cn } from '@/lib/utils';
import Image from 'next/image';

type LogoProps = {
	className?: string;
	imgClassName?: string;
	logoSize?: number;
};

export default function Logo({ className = '', imgClassName = '', logoSize = 110 }: LogoProps) {
	return (
		<div className={cn('flex w-full justify-center', className)}>
			<Image
				src="/WildRiverLogo.svg"
				alt="hotel logo"
				width={logoSize}
				height={logoSize}
				className={cn('rounded-full bg-white p-2 invert', imgClassName)}
				priority
			/>
		</div>
	);
}
