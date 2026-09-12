type RuntimeEnv = Record<string, unknown>;

let cloudflareEnv: RuntimeEnv | undefined;

export function setRuntimeEnv(env: unknown): void {
  if (env && typeof env === "object") {
    cloudflareEnv = env as RuntimeEnv;
  }
}

export function getRuntimeEnv(name: string): string | undefined {
  const cloudflareValue = cloudflareEnv?.[name];
  if (typeof cloudflareValue === "string" && cloudflareValue.length > 0) {
    return cloudflareValue;
  }

  const processValue = process.env[name];
  return typeof processValue === "string" && processValue.length > 0
    ? processValue
    : undefined;
}