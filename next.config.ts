import type { NextConfig } from "next";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const useProjectPagesBasePath = isGitHubActions && repoName !== "" && !repoName.endsWith(".github.io");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: useProjectPagesBasePath ? `/${repoName}` : undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
