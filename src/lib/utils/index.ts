import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<ClassValue>) {
	return twMerge(clsx(inputs));
}

export const isSomeTrue = <TData>(values: Array<TData>): boolean => {
	return values.some((status) => Boolean(status));
};

export const timestamps: { createdAt: true; updatedAt: true } = {
	createdAt: true,
	updatedAt: true,
};

type TryError = [data: undefined, error: Error];
type TrySuccess<TData> = [data: TData, error: undefined];
type TryResult<TData> = TrySuccess<TData> | TryError;

export const trySync = <TData>(fn: () => TData): TryResult<TData> => {
	try {
		const result = fn();
		return [result, undefined];
	} catch (error) {
		const returnError =
			error instanceof Error ? error : new Error('Unknown Error', { cause: error });
		return [undefined, returnError];
	}
};

export const tryAsync = async <TData>(fn: () => Promise<TData>): Promise<TryResult<TData>> => {
	try {
		const result = await fn();
		return [result, undefined];
	} catch (error) {
		const returnError =
			error instanceof Error ? error : new Error('Unknown Error', { cause: error });
		return [undefined, returnError];
	}
};
