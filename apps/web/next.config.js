import path from "path";

export default {
  reactStrictMode: true,
  transpilePackages: ["@repo/ui"],
  output: "standalone",
  outputFileTracingRoot: path.join(process.cwd(), "../../"),
};
