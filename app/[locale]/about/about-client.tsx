"use client";

import { useEffect, useState } from "react";
import { CompanyOverview } from "@/components/company-overview";
import { fetchApiJson } from "@/lib/api";

interface AboutApiResponse {
  status?: string;
  data?: any;
}

export function AboutClient({
  locale,
  initialData,
}: {
  locale: string;
  initialData: any | null;
}) {
  const [aboutData, setAboutData] = useState<any | null>(initialData);
  const [loading, setLoading] = useState<boolean>(initialData === null);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  useEffect(() => {
    if (initialData !== null && reloadNonce === 0) {
      return;
    }

    let cancelled = false;

    const loadAbout = async () => {
      setLoading(true);
      setFetchError(false);

      const res = await fetchApiJson<AboutApiResponse>(
        `/api/about?locale=${encodeURIComponent(locale)}`,
        { timeoutMs: 10000 }
      );

      if (cancelled) return;

      if (res.ok && res.data?.data) {
        setAboutData(res.data.data);
      } else {
        console.error("[AboutClient] Failed to load about data:", res.error);
        setFetchError(true);
      }
      setLoading(false);
    };

    loadAbout();

    return () => {
      cancelled = true;
    };
  }, [locale, initialData, reloadNonce]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 animate-pulse">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5 aspect-square rounded-2xl bg-slate-200" />
          <div className="lg:col-span-7 space-y-4">
            <div className="h-4 w-32 bg-slate-200 rounded" />
            <div className="h-10 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded mt-4" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (fetchError || !aboutData) {
    return (
      <div className="py-24 px-6 text-center">
        <p className="text-slate-600 mb-4">
          {locale === "en"
            ? "Unable to load company profile right now."
            : locale === "zh-Hans"
            ? "暂时无法加载公司简介数据。"
            : "Data gagal dimuat. Silakan coba lagi."}
        </p>
        <button
          type="button"
          onClick={() => setReloadNonce((n) => n + 1)}
          className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-amber-600 transition-colors"
        >
          {locale === "en" ? "Retry" : locale === "zh-Hans" ? "重试" : "Muat Ulang"}
        </button>
      </div>
    );
  }

  return <CompanyOverview data={aboutData} />;
}

