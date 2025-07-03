import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [{ hostname: "www.anapolis.go.gov.br" }] },
};

export default nextConfig;
