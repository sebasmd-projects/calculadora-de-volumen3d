/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/demo/calculadora-volumen',
  assetPrefix: '/demo/calculadora-volumen',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/demo/calculadora-volumen',
  },
}

export default nextConfig