import { fetchApiJson } from "@/lib/api";
import { AboutClient } from "./about-client";

export const dynamic = "force-dynamic";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

interface AboutApiResponse {
  status?: string;
  data?: any;
}

async function getAboutPageData(locale: string) {
  const currentLocale = locale || "id";
  const res = await fetchApiJson<AboutApiResponse>(
    `/api/about?locale=${encodeURIComponent(currentLocale)}`,
    { timeoutMs: 3500 }
  );

  if (!res.ok || !res.data?.data) {
    console.error(`[AboutPage] Server fetch failed for locale="${currentLocale}":`, res.error);
    return null;
  }

  return res.data.data;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || "id";
  const aboutData = await getAboutPageData(locale);

  return (
    <main className="min-h-screen bg-white pt-20">
      <AboutClient locale={locale} initialData={aboutData} />
    </main>
  );
}
