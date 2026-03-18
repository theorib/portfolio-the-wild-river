/* eslint-disable @next/next/no-img-element */
import type { ImageProps, StaticImageData } from 'next/image';
import type { ComponentType, ReactElement } from 'react';

type StaticRequire = { default: StaticImageData };

function toSrcString(src: ImageProps['src']): string {
	if (typeof src === 'string') return src;
	if ('default' in src) return (src as StaticRequire).default.src;
	return src.src;
}

function MockNextImage({ alt, height, src, width }: Readonly<ImageProps>): ReactElement {
	return <img alt={alt} height={height} src={toSrcString(src)} width={width} />;
}

const mockNextImage: { default: ComponentType<ImageProps> } = {
	default: MockNextImage,
};

export default mockNextImage;
