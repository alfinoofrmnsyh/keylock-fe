import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CheckCircle, MessageSquare } from "lucide-react"

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL
const WHATSAPP_NUMBER = "6281234567890"

// Fungsi render Rich Text yang aman
const RichTextRenderer = ({ content }: { content: any }) => {
  if (!content) return null
  return content.map((block: any, index: number) => {
    if (block.type === 'paragraph') {
      return (
        <p key={index} className="mb-4">
          {block.children?.map((child: any, i: number) => (
            <span key={i} className={child.bold ? "font-bold" : ""}>{child.text}</span>
          ))}
        </p>
      )
    }
    return null
  })
}

// REVISI FUNGSI FETCH
async function getProductDetail(productSlug: string, locale: string) {
  const strapiLocale = locale === "zh-Hans" ? "zh-Hans" : locale === "en" ? "en" : "id"
  
  // URL Encode slug untuk menangani karakter khusus
  const url = `${strapiBaseUrl}/api/products?filters[slug][$eq]=${encodeURIComponent(productSlug)}&locale=${strapiLocale}&populate=*`
  
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    const response = await res.json()
    // Mengembalikan data pertama jika ditemukan
    return response?.data?.[0] || null
  } catch (error) {
    console.error("Fetch Error:", error)
    return null
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ locale: string, category: string, slug: string }> }) {
  const { locale, category, slug } = await params
  
  // Debugging log ke terminal
  console.log("Loading Product:", { locale, category, slug })

  const product = await getProductDetail(slug, locale)

  // Jika product null, panggil notFound()
  if (!product) {
    console.error("Product not found in Strapi for slug:", slug)
    return notFound()
  }

  const productImg = product.image?.url 
    ? (product.image.url.startsWith("http") ? product.image.url : `${strapiBaseUrl}${product.image.url}`)
    : "/images/product_placeholder.png"

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <Link href={`/${locale}/products/${category}`} className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 mb-8">
          <ArrowLeft className="size-4" />
          {locale === "en" ? "Back to Catalog" : locale === "zh-Hans" ? "返回目录" : "Kembali ke Katalog"}
        </Link>

        <div className="grid gap-12 lg:grid-cols-2 bg-white rounded-3xl p-10 border shadow-sm">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
            <Image src={productImg} alt={product.title} fill className="object-cover" unoptimized />
          </div>

          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold text-slate-900">{product.title}</h1>
            
            <div className="mt-8 border-t pt-6">
              <h2 className="text-sm font-bold uppercase mb-3">
                {locale === "en" ? "Specifications" : locale === "zh-Hans" ? "技术规格" : "Spesifikasi Teknis"}
              </h2>
              <div className="text-slate-600 prose">
                <RichTextRenderer content={product.desc} />
              </div>
            </div>

            <div className="mt-auto pt-6 border-t">
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Halo, saya tertarik dengan produk: ${product.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0c1a30] p-4 text-white hover:bg-amber-500 transition-all font-bold"
              >
                <MessageSquare className="size-5" />
                {locale === "en" ? "Request Quotation via WhatsApp" : locale === "zh-Hans" ? "通过 WhatsApp 获取报价" : "Minta Penawaran via WhatsApp"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}