import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Poppins, Montserrat, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

// 1. Inisialisasi Google Fonts secara optimal
const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})
const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
})

// 2. Kamus Konten SEO Internasionalisasi (i18n)
const SEO_CONTENT: Record<string, { title: string; description: string }> = {
  id: {
    title: 'Keylock Indonesia | Jual & Sewa Forklift | Sistem Rak Gudang Racking',
    description: 'Solusi logistik cerdas: jual & sewa forklift harian/tahunan, sistem rak gudang (racking), pallet plastik, dan alat material handling berkualitas di Indonesia.',
  },
  en: {
    title: 'Keylock Indonesia | Forklift Sales, Rental & Material Handling Solutions',
    description: 'Smart logistics solutions: forklift sales, rental, warehouse racking systems, plastic pallets, and complete material handling equipment across Indonesia.',
  },
  'zh-Hans': {
    title: 'Keylock Indonesia | 叉车销售与租赁 | 仓库货架系统与物流设备解决方案',
    description: '智能物流解决方案：印度尼西亚各地的叉车销售、租赁、仓库货架系统和塑料托盘。致力于为您提供一站式物流转运、高位仓储及装卸货解决方案。',
  }
}

// 3. Generator Metadata Dinamis untuk Mesin Pencari (SEO)
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const seo = SEO_CONTENT[locale] || SEO_CONTENT.id

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      'Forklift Karawang', 'Forklift Bekasi', 'Sewa Forklift Karawang', 
      'Rental Forklift Bekasi', 'Jual Forklift Indonesia', 'Warehouse Rack', 
      'Rak Gudang', 'Pallet Plastik', 'Material Handling Equipment'
    ],
    authors: [{ name: 'Keylock Indonesia' }],
    openGraph: {
      title: seo.title,
      description: seo.description,
      type: 'website',
      locale: locale === 'id' ? 'id_ID' : locale === 'zh-Hans' ? 'zh_CN' : 'en_US',
    },
  }
}

// 4. Standarisasi Parameter Rute Statis Next.js
export async function generateStaticParams() {
  return [{ locale: 'id' }, { locale: 'en' }, { locale: 'zh-Hans' }]
}

// 5. Fungsi Fetching Data Komponen Footer Utama dari Strapi CMS
async function getHomepageFooterData(locale: string) {
  let strapiLocale = "id"
  if (locale === "zh-Hans" || locale.startsWith("zh")) {
    strapiLocale = "zh-Hans"
  } else if (locale.startsWith("en")) {
    strapiLocale = "en"
  }

  try {
    // Memanggil skema populate footer_section sesuai konfigurasi database Strapi kamu
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL
    const res = await fetch(
      `${strapiBaseUrl}/api/homepage?locale=${strapiLocale}&populate[footer_section]=*`,
      { 
        method: "GET",
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 0 } // Menonaktifkan cache agresif agar sinkronisasi CMS instan
      }
    )

    if (!res.ok) {
      console.error(`Gagal memuat API global footer. Status: ${res.status}`)
      return null
    }

    const response = await res.json()
    
    // Fallback ekstraksi objek data komponen (Mendukung Strapi v4 & v5)
    return response?.data?.footer_section || response?.data?.attributes?.footer_section || null
  } catch (error) {
    console.error("Koneksi gagal ke API Strapi footer_section:", error)
    return null
  }
}

// 6. Komponen Layout Utama (RootLayout)
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params
  
  // Mengambil data footer dari server sebelum merender komponen halaman
  const footerStrapiData = await getHomepageFooterData(locale || 'id')

  return (
    <html
      lang={locale || 'id'}
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${geistMono.variable} bg-background`}
    >
      <body className="font-sans antialiased text-slate-900 bg-white flex flex-col min-h-screen">
        
        {/* HEADER / NAVBAR GLOBAL */}
        <Navbar locale={locale || 'id'} />
        
        {/* MAIN CONTAINER CONTENT */}
        {/* Kelas 'flex-grow' memastikan jika konten halaman pendek (seperti error/loading), footer tetap tertahan di paling bawah layar */}
        <main className="w-full flex-grow">
          {children}
        </main>
        
        {/* FOOTER GLOBAL (Menerima Aliran Data Dinamis Strapi) */}
        <Footer locale={locale || 'id'} data={footerStrapiData} />
        
        {/* VERCEL ANALYTICS */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}