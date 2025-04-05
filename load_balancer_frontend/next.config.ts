import type { NextConfig } from "next";

const env = process.env.NODE_ENV || "development";
let temp: NextConfig;

if (env === "development") {
    temp = {
        basePath: "/config",
        assetPrefix: "/config",
        output: "export"
    };
} else {
    temp = {
        basePath: "/FYP-ui",
        assetPrefix: "/FYP-ui",
        output: "export"
    };
}

const nextConfig: NextConfig = temp;

export default nextConfig;
