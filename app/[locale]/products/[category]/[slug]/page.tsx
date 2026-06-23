import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
// 1. Import komponen tombol client yang baru dibuat
import { ProductWhatsAppButton } from "@/components/product-whatsapp-button"

async function getProductDetail(slug: string, locale: string) {
  const laravelBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const url = `${laravelBaseUrl}/api/products/${slug}?locale=${locale}`;
  
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    const response = await res.json();
    return response.data || null;
  } catch (error) {
    return null;
  }
}

// 2. Kamus Label Konversi Google Ads untuk masing-masing Bahasa
const GADS_LABELS: Record<string, string> = {
  id: "8m9jCPu8sEceLCd9_xD",
  en: "8m9jCPu8sEceLCd9_xD",
  "zh-Hans": "8m9jCPu8sEceLCd9_xD",
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const { locale, category, slug } = await params;
  const product = await getProductDetail(slug, locale);

  if (!product) return notFound();

  const title = product.title[locale] || product.title['id'];
  const description = product.desc[locale] || product.desc['id'];

  const WHATSAPP_NUMBER = "6289699392924";
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk: ${title}`)}`;
  
  // Ambil label konversi yang sesuai dengan locale aktif
  const currentGadsLabel = GADS_LABELS[locale] || GADS_LABELS.id;

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={`/${locale}/products/${category}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-8">
          <ArrowLeft className="size-4" />
          {locale === "en" ? "Back" : locale === "zh-Hans" ? "返回" : "Kembali"}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 bg-white rounded-3xl p-10 border shadow-sm">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image 
              src={product.image_url || "/placeholder.png"} 
              alt={title} 
              fill 
              className="object-cover" 
              unoptimized 
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold text-slate-900">{title}</h1>
            <div className="text-sm mt-5 border-t pt-6 text-slate-600 prose">
               <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            {/* 3. Render komponen tombol pelacak konversi di sini */}
            <div className="mt-auto pt-6 border-t">
              <ProductWhatsAppButton 
                whatsappUrl={whatsappUrl} 
                locale={locale} 
                gadsLabel={currentGadsLabel} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}