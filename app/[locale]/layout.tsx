import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Poppins, Montserrat, Geist_Mono } from 'next/font/google'
import Script from 'next/script' // <-- 1. Import komponen Script bawaan Next.js
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

// 5. Komponen Layout Utama (RootLayout)
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode
  params: Promise<{ locale: string }>
}>) {
  const { locale } = await params

  return (
    <html
      lang={locale || 'id'}
      className={`${inter.variable} ${poppins.variable} ${montserrat.variable} ${geistMono.variable} bg-background`}
    >
      <head>
        {/* 2. Google tag (gtag.js) - Di-load secara asinkron setelah halaman interaktif */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18247175856"
          strategy="afterInteractive"
        />
        <Script id="google-ads-tag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18247175856');
          `}
        </Script> */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5S436JBQ');
          `}
        </Script>
        
      </head>
      <body className="font-sans antialiased text-slate-900 bg-white flex flex-col min-h-screen">
       <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-5S436JBQ"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }} 
          />
        </noscript>
        {/* HEADER / NAVBAR GLOBAL */}
        <Navbar locale={locale || 'id'} />
        
        {/* MAIN CONTAINER CONTENT */}
        <main className="w-full flex-grow">
          {children}
        </main>
        
        {/* FOOTER GLOBAL */}
        <Footer locale={locale || 'id'} />
        
        {/* VERCEL ANALYTICS */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}