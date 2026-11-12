"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductWhatsAppButton } from "@/components/product-whatsapp-button";
import { useContact } from "@/hooks/useContact";
import { buildWhatsAppUrl, DEFAULT_CONTACTS } from "@/lib/contact";
import { fetchApiJson, getLocalizedField, resolveImageUrl } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";

export interface ProductDetailData {
  id?: number | string;
  slug: string;
  title?: unknown;
  desc?: unknown;
  image_url?: string | null;
  category_slug?: string;
}

interface ProductDetailApiResponse {
  status?: string;
  data?: ProductDetailData | null;
}

interface ProductDetailClientProps {
  locale: string;
  category: string;
  slug: string;
  gadsLabel: string;
  initialProduct: ProductDetailData | null;
  initialSanitizedDesc?: string;
  initialContactNumber?: string | null;
}

export function ProductDetailClient({
  locale,
  category,
  slug,
  gadsLabel,
  initialProduct,
  initialSanitizedDesc,
  initialContactNumber,
}: ProductDetailClientProps) {
  const [product, setProduct] = useState<ProductDetailData | null>(initialProduct);
  const [loading, setLoading] = useState<boolean>(initialProduct === null);
  const [notFoundState, setNotFoundState] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<boolean>(false);
  const [reloadNonce, setReloadNonce] = useState<number>(0);

  const { selectedContact } = useContact(locale);

  useEffect(() => {
    if (initialProduct !== null && reloadNonce === 0) {
      return;
    }

    let cancelled = false;

    const loadDetail = async () => {
      setLoading(true);
      setNotFoundState(false);
      setFetchError(false);

      const res = await fetchApiJson<ProductDetailApiResponse>(
        `/api/products/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
        { timeoutMs: 10000 }
      );

      if (cancelled) return;

      if (res.status === 404) {
        setNotFoundState(true);
        setLoading(false);
        return;
      }

      if (res.ok && res.data?.data) {
        setProduct(res.data.data);
      } else if (res.ok && !res.data?.data) {
        setNotFoundState(true);
      } else {
        console.error("[ProductDetailClient] Failed to load product detail:", res.error);
        setFetchError(true);
      }

      setLoading(false);
    };

    loadDetail();

    return () => {
      cancelled = true;
    };
  }, [slug, locale, initialProduct, reloadNonce]);

  const backHref = `/${locale}/products/${category}`;
  const backLabel = locale === "en" ? "Back" : locale === "zh-Hans" ? "返回" : "Kembali";

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="h-5 w-24 bg-slate-200 rounded mb-8 animate-pulse" />
          <div className="grid gap-12 lg:grid-cols-2 bg-white rounded-3xl p-10 border shadow-sm animate-pulse">
            <div className="aspect-[4/3] w-full rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-slate-200 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded mt-6" />
              <div className="h-4 w-5/6 bg-slate-100 rounded" />
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
              <div className="h-12 w-full bg-slate-200 rounded-xl mt-10" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (notFoundState) {
    return (
      <main className="min-h-screen bg-slate-50 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center bg-white rounded-3xl p-10 border shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3">
            {locale === "en"
              ? "Product Not Found"
              : locale === "zh-Hans"
              ? "未找到该产品"
              : "Produk Tidak Ditemukan"}
          </h1>
          <p className="text-slate-500 mb-6">
            {locale === "en"
              ? "The product you are looking for is unavailable or has been moved."
              : locale === "zh-Hans"
              ? "您查找的产品不存在或已下架。"
              : "Produk yang Anda cari tidak tersedia atau telah dipindahkan."}
          </p>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
          >
            <ArrowLeft className="size-4" />
            {backLabel}
          </Link>
        </div>
      </main>
    );
  }

  if (fetchError || !product) {
    return (
      <main className="min-h-screen bg-slate-50 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 text-center bg-white rounded-3xl p-10 border shadow-sm">
          <p className="text-slate-600 mb-6">
            {locale === "en"
              ? "Unable to load product details right now. Please try again."
              : locale === "zh-Hans"
              ? "暂时无法加载产品详情，请重试。"
              : "Gagal memuat detail produk. Silakan coba lagi."}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="size-4" />
              {backLabel}
            </Link>
            <button
              type="button"
              onClick={() => setReloadNonce((n) => n + 1)}
              className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-600 transition-colors"
            >
              {locale === "en" ? "Retry" : locale === "zh-Hans" ? "重试" : "Muat Ulang"}
            </button>
          </div>
        </div>
      </main>
    );
  }

  const title = getLocalizedField(product.title, locale) || product.slug;
  const rawDesc = getLocalizedField(product.desc, locale);
  const safeDescription =
    initialProduct !== null && initialSanitizedDesc !== undefined
      ? initialSanitizedDesc
      : sanitizeHtml(rawDesc);

  const contactNumber = selectedContact || initialContactNumber || DEFAULT_CONTACTS.contact2;
  const inquiryMessage =
    locale === "en"
      ? `Hello, I am interested in this product: ${title}`
      : locale === "zh-Hans"
      ? `您好，我对这款产品很感兴趣: ${title}`
      : `Halo, saya tertarik dengan produk: ${title}`;
  const whatsappUrl = buildWhatsAppUrl(contactNumber, inquiryMessage);
  const imageUrl = resolveImageUrl(product.image_url, "/placeholder.png");

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={backHref} className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-8">
          <ArrowLeft className="size-4" />
          {backLabel}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 bg-white rounded-3xl p-6 sm:p-10 border shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image src={imageUrl} alt={title} fill className="object-cover" unoptimized />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
            <div className="text-sm mt-5 border-t pt-6 text-slate-600 prose">
              <div dangerouslySetInnerHTML={{ __html: safeDescription }} />
            </div>

            <div className="mt-auto pt-6 border-t">
              <ProductWhatsAppButton
                whatsappUrl={whatsappUrl}
                locale={locale}
                gadsLabel={gadsLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

