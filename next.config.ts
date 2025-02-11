import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    // serverExternalPackages: ['@node-rs/argon2', 'oslo/password'],
    // serverComponentsExternalPackages: ['@node-rs/argon2', 'oslo/password'],

    reactCompiler: true,
  },
  // serverExternalPackages: ['@node-rs/argon2', 'oslo/password'],
  serverExternalPackages: ['@node-rs/argon2'],
  // we will handle errors with git action hooks
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [220, 390, 430, 640, 768, 1080, 1280, 1920, 2048, 2560, 3840],
  },
}

export default nextConfig
