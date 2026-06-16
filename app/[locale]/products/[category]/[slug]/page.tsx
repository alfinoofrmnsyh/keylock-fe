import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, MessageSquare } from "lucide-react"

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

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const { locale, category, slug } = await params;
  const product = await getProductDetail(slug, locale);

  if (!product) return notFound();

  // FIX: Ambil data spesifik berdasarkan locale
  const title = product.title[locale] || product.title['id'];
  const description = product.desc[locale] || product.desc['id'];

  const WHATSAPP_NUMBER = "6281234567890";

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={`/${locale}/products/${category}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-8">
          <ArrowLeft className="size-4" />
          {locale === "en" ? "Back" : locale === "zh-Hans" ? "返回" : "Kembali"}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 bg-white rounded-3xl p-10 border shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image 
              // GANTI menjadi product.image_url
              src={product.image_url || "/placeholder.png"} 
              alt={title} 
              fill 
              className="object-cover" 
              unoptimized 
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-slate-900">{title}</h1>
            <div className="mt-8 border-t pt-6 text-slate-600 prose">
               <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>

            <div className="mt-auto pt-6 border-t">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk: ${title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0c1a30] p-4 text-white hover:bg-amber-500 font-bold"
              >
                <MessageSquare className="size-5" />
                {locale === "en" ? "Request Quote" : locale === "zh-Hans" ? "获取报价" : "Minta Penawaran"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}