/// <reference types="node" />
import fs from "fs";
import path from "path";
import { execFileSync, spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PACKAGE_FILE = path.join(ROOT, "package.json");
const SEMVER_RE = /^\d+\.\d+\.\d+$/;

type ExecOptions = {
  allowFailure?: boolean;
  inherit?: boolean;
};

function exec(command: string, args: string[], options: ExecOptions = {}): string {
  try {
    const output = execFileSync(command, args, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: options.inherit ? "inherit" : "pipe",
    });

    return typeof output === "string" ? output.trim() : "";
  } catch (error) {
    if (options.allowFailure) return "";
    throw error;
  }
}

function commandExists(command: string): boolean {
  const result = spawnSync(command, ["--version"], {
    cwd: ROOT,
    stdio: "ignore",
  });

  return result.error === undefined;
}

function readVersion(): string {
  const content = JSON.parse(fs.readFileSync(PACKAGE_FILE, "utf8"));
  const version = content.version as string | undefined;

  if (!version || !SEMVER_RE.test(version)) {
    throw new Error("Could not find a semantic version in 'package.json'.");
  }

  return version;
}

function extractRepository(remoteUrl: string): string {
  const normalized = remoteUrl.replace(/\.git$/, "");

  if (normalized.startsWith("git@")) {
    return normalized.split(":").at(-1) ?? "";
  }

  for (const prefix of ["https://github.com/", "http://github.com/"]) {
    if (normalized.startsWith(prefix)) return normalized.slice(prefix.length);
  }

  return "";
}

function resolveRepository(): string {
  const remoteUrl = exec("git", ["config", "--get", "remote.origin.url"], { allowFailure: true });
  const repository = process.env.GITHUB_REPOSITORY || extractRepository(remoteUrl);

  if (!repository || !repository.includes("/")) {
    throw new Error("Could not determine the GitHub repository.");
  }

  return repository;
}

function resolveReleaseRef(): string {
  if (spawnSync("git", ["rev-parse", "--verify", "--quiet", "refs/remotes/origin/release"], { cwd: ROOT }).status === 0) {
    return "origin/release";
  }

  if (spawnSync("git", ["rev-parse", "--verify", "--quiet", "refs/heads/release"], { cwd: ROOT }).status === 0) {
    return "release";
  }

  throw new Error("Could not find a local 'release' or 'origin/release' ref.");
}

function countCommitsSinceRelease(releaseRef: string): string {
  const commitCount = exec("git", ["rev-list", "--count", `${releaseRef}..HEAD`]);

  if (!/^\d+$/.test(commitCount)) {
    throw new Error("Could not count commits since the release branch.");
  }

  return commitCount;
}

function resolveActor(): string {
  if (process.env.GITHUB_ACTOR) return process.env.GITHUB_ACTOR;
  return exec("gh", ["api", "user", "--jq", ".login"], { allowFailure: true });
}

function main(): void {
  const currentBranch = exec("git", ["rev-parse", "--abbrev-ref", "HEAD"]);

  if (!currentBranch || currentBranch === "HEAD") {
    throw new Error("Could not determine the current branch.");
  }

  if (currentBranch === "release") {
    throw new Error("The release branch can only be a pull request destination.");
  }

  const repository = resolveRepository();

  if (currentBranch !== "main") {
    console.log("Open a pull request in GitHub:");
    console.log(`https://github.com/${repository}/compare/main...${encodeURIComponent(currentBranch)}?quick_pull=1`);
    return;
  }

  if (!commandExists("gh")) {
    throw new Error("Missing 'gh'. Install GitHub CLI to create the release candidate pull request.");
  }

  exec("git", ["fetch", "origin", "release:refs/remotes/origin/release"], { allowFailure: true });

  const version = readVersion();
  const commitCount = countCommitsSinceRelease(resolveReleaseRef());
  const actor = resolveActor();
  const args = [
    "pr",
    "create",
    "--repo",
    repository,
    "--base",
    "release",
    "--head",
    "main",
    "--title",
    `Release Candidate v${version}`,
    "--body",
    `Coming soon…\n\n__(${commitCount} commits since last release)__`,
    "--label",
    "Release",
  ];

  if (actor) {
    args.push("--assignee", actor);
  } else {
    console.warn("Could not determine GitHub actor; creating the pull request without auto-assigning.");
  }

  exec("gh", args, { inherit: true });
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
