/** @type {import('next').NextConfig} */
const PATH = process.env.BASE_PATH || '/demo/calculadora-volumen'

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: PATH,
  assetPrefix: PATH,
  env: {
    NEXT_PUBLIC_BASE_PATH: PATH,
  },
}

export default nextConfig