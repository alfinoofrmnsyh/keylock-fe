import { CompanyOverview } from "@/components/company-overview"

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

async function getAboutPageData(locale: string) {
  const currentLocale = locale || "id"
  const laravelBaseUrl = process.env.NEXT_PUBLIC_API_URL
  
  try {
    const res = await fetch(`${laravelBaseUrl}/api/about?locale=${currentLocale}`, { 
      cache: "no-store" 
    })

    if (!res.ok) return null
    
    const response = await res.json()
    return response?.data || null
  } catch (error) {
    console.error("Gagal mengambil data Laravel:", error)
    return null
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params
  const locale = resolvedParams?.locale || "id"
  const aboutData = await getAboutPageData(locale)

  if (!aboutData) {
    return <div className="pt-32 text-center text-red-500">Data gagal dimuat.</div>
  }

  return (
    <main className="min-h-screen bg-white pt-20"> 
      <CompanyOverview data={aboutData} />
    </main>
  )
}