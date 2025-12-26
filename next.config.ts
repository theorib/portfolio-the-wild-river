import { type NextConfig } from 'next';

const nextConfig: NextConfig = {
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		optimizePackageImports: ['lucide-react'],
	},
	// we will handle errors with git action hooks
	typescript: {
		ignoreBuildErrors: true,
	},

	images: {
		remotePatterns: [new URL('https://xymetprhvhaodfebesxu.supabase.co/**')],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [220, 390, 430, 640, 768, 1080, 1280, 1920, 2048, 2560, 3840],
	},
};

export default nextConfig;
