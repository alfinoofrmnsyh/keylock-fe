export function getApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim() || "";
  return raw.replace(/\/+$/, "");
}

export async function fetchApiJson<T = unknown>(
  path: string,
  options?: { timeoutMs?: number; headers?: Record<string, string> }
): Promise<{ ok: boolean; status: number; data: T | null; error?: string }> {
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) {
    return {
      ok: false,
      status: 0,
      data: null,
      error: "NEXT_PUBLIC_API_URL is not configured",
    };
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${baseUrl}${normalizedPath}`;
  const timeoutMs = options?.timeoutMs ?? 4000;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs),
      headers: {
        Accept: "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        data: null,
        error: `HTTP ${res.status} from ${url}`,
      };
    }

    const data = (await res.json()) as T;
    return { ok: true, status: res.status, data };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      status: 0,
      data: null,
      error: message,
    };
  }
}

export function getLocalizedField(field: unknown, locale: string): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (typeof field === "object") {
    const record = field as Record<string, unknown>;
    const value =
      record[locale] ??
      record["id"] ??
      Object.values(record).find((v) => typeof v === "string" && v.trim().length > 0);
    return typeof value === "string" ? value : "";
  }
  return "";
}

export function resolveImageUrl(imageUrl?: string | null, fallback = "/placeholder.png"): string {
  if (!imageUrl) return fallback;
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }
  const baseUrl = getApiBaseUrl();
  if (!baseUrl) return fallback;
  if (imageUrl.startsWith("/")) {
    return `${baseUrl}${imageUrl}`;
  }
  return `${baseUrl}/storage/${imageUrl}`;
}

