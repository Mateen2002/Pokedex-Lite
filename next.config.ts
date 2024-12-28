import type { NextConfig } from "next";

module.exports = {
  rules: {
    '@typescript-eslint/no-unused-vars': ['off'],
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}


const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
