import { CompanyOverview } from "@/components/company-overview"
import { notFound } from "next/navigation"


interface AboutPageProps {
  // params di Next.js 15/16 berbentuk Promise
  params: Promise<{
    locale: string
  }>
}

// Fungsi fetch murni mengambil data dari Single Type 'about-page'
async function getAboutPageData(locale: string) {
  // Definisikan fallback aman jika locale tidak sengaja kosong
  const currentLocale = locale || "id"
  const strapiLocale = currentLocale.startsWith("zh-Hans") ? "zh-Hans" : currentLocale.startsWith("en") ? "en" : "id"
  const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL
  
  try {
    const res = await fetch(
      `${strapiBaseUrl}/api/aboutpage?locale=${strapiLocale}&populate=*`,
      { cache: "no-store" }
    )

    if (!res.ok) return null
    
    const response = await res.json()
    return response?.data || null
  } catch (error) {
    console.error("Gagal menghubungkan ke API Strapi about-page:", error)
    return null
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || "id"

  const aboutData = await getAboutPageData(locale)

  // JIKA STRAPI KOSONG, JANGAN LANGSUNG 404. TAMPILKAN PESAN INI UNTUK DEBUGGING:
  if (!aboutData) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-xl font-bold text-red-500">Rute Next.js Berhasil Diakses!</h1>
        <p className="text-slate-600 mt-2">Tapi data dari Strapi (about-page) masih kosong atau gagal di-fetch.</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white pt-20"> 
      <CompanyOverview data={aboutData} />
    </main>
  )
}

