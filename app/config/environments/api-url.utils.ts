export function resolveApiBaseUrl(raw: string | undefined): string {
  const trimmed = raw?.trim() ?? "";

  if (!trimmed) {
    return "";
  }

  return trimmed.endsWith("/") ? trimmed : `${trimmed}/`;
}
