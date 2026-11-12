import { notFound } from "next/navigation";
import { sanitizeHtml } from "@/lib/sanitize";
import { fetchContactData, DEFAULT_CONTACTS } from "@/lib/contact";
import { fetchApiJson, getLocalizedField } from "@/lib/api";
import { ProductDetailClient, type ProductDetailData } from "./product-detail-client";

interface ProductDetailApiResponse {
  status?: string;
  data?: ProductDetailData | null;
}

const GADS_LABELS: Record<string, string> = {
  id: "8m9jCPu8sEceLCd9_xD",
  en: "8m9jCPu8sEceLCd9_xD",
  "zh-Hans": "8m9jCPu8sEceLCd9_xD",
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; slug: string }>;
}) {
  const { locale, category, slug } = await params;

  const res = await fetchApiJson<ProductDetailApiResponse>(
    `/api/products/${encodeURIComponent(slug)}?locale=${encodeURIComponent(locale)}`,
    { timeoutMs: 3500 }
  );

  if (res.status === 404) {
    return notFound();
  }

  let initialProduct: ProductDetailData | null = null;
  let initialSanitizedDesc: string | undefined;
  let initialContactNumber: string | null = null;

  if (res.ok && res.data?.data) {
    initialProduct = res.data.data;
    const rawDesc = getLocalizedField(initialProduct.desc, locale);
    initialSanitizedDesc = sanitizeHtml(rawDesc);

    const contactData = await fetchContactData(locale);
    initialContactNumber =
      contactData?.contact || contactData?.contact2 || contactData?.contact1 || DEFAULT_CONTACTS.contact2;
  } else if (res.ok && !res.data?.data) {
    return notFound();
  } else {
    console.error(`[ProductDetailPage] Server fetch failed for slug="${slug}", locale="${locale}":`, res.error);
  }

  const currentGadsLabel = GADS_LABELS[locale] || GADS_LABELS.id;

  return (
    <ProductDetailClient
      locale={locale}
      category={category}
      slug={slug}
      gadsLabel={currentGadsLabel}
      initialProduct={initialProduct}
      initialSanitizedDesc={initialSanitizedDesc}
      initialContactNumber={initialContactNumber}
    />
  );
}
