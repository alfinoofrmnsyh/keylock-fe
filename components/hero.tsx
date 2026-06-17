"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Phone, MessageSquare } from "lucide-react"

interface HeroProps {
  locale?: string;
}

// Kamus data statis multi-bahasa langsung di dalam komponen
const heroData: Record<string, any> = {
  id: {
    hero_badge: "Spesialis Material Handling & Racking",
    title: "Maksimalkan Kapasitas Ruang & Efisiensi Gudang Anda",
    subtitle: "Kami menyediakan unit Forklift (baru/bekas), Pallet Plastik, Industrial Tools, Truck Scale, dan Rak Gudang berkualitas. Solusi satu pintu untuk meningkatkan efisiensi operasional pabrik Anda.",
    cta_text: "Minta Penawaran",
    hero_cta_link: "https://wa.me/62xxxxxxxxxx",
    cta_text2: "Konsultasi Penjualan (WA)",
    hero_cta_link2: "https://wa.me/62xxxxxxxxxx",
    steps: [
      { id: 1, title: "Penjualan & Sewa <b>Forklift</b>", description: "Ketersediaan forklift <b>bergaransi</b>" },
      { id: 2, title: "Sistem <b>Racking Gudang</b>", description: "Kapasitas ruang <b>vertikal</b>" },
      { id: 3, title: "Palet <b>Plastik</b>", description: "Daya tahan tinggi & <b>berkualitas</b>" },
      { id: 4, title: "Solusi <b>Logistik</b>", description: "Layanan satu pintu dari para <b>ahli</b>" }
    ]
  },
  en: {
    hero_badge: "Material Handling & Racking Specialist",
    title: "Maximize Your Space Capacity & Warehouse Efficiency",
    subtitle: "We provide new & used Forklifts, Plastic Pallets, Industrial Tools, Truck Scales, and Storage Racks. A one-stop solution to maximize your factory's operational efficiency.",
    cta_text: "Request a Quote",
    hero_cta_link: "https://wa.me/62xxxxxxxxxx",
    cta_text2: "Sales Consultation (WA)",
    hero_cta_link2: "https://wa.me/62xxxxxxxxxx",
    steps: [
          { id: 1, title: "<b>Forklift</b> Sales & Rental", description: "<b>Guaranteed</b> forklift availability" },
          { id: 2, title: "<b>Warehouse Racking</b> Systems", description: "<b>Vertical</b> space capacity" },
          { id: 3, title: "<b>Plastic</b> Pallets", description: "High durability & <b>quality</b>" },
          { id: 4, title: "<b>Logistics</b> Solutions", description: "One-stop service from <b>experts</b>" }
        ]
  },
  "zh-Hans": {
    hero_badge: "物料搬运与仓储货架专家",
    title: "最大化您的空间容量与仓库效率",
    subtitle: "我们提供优质叉车销售与租赁、仓库货架系统以及高品质塑料托盘的集成服务。旨在最大程度减少停机时间并优化您的物流流程。",
    cta_text: "索取报价",
    hero_cta_link: "https://wa.me/62xxxxxxxxxx",
    cta_text2: "销售咨询 (微信)",
    hero_cta_link2: "weixin://",
    steps: [
          { id: 1, title: "<b>叉车</b>销售与租赁", description: "<b>有保障的</b>叉车供应" },
          { id: 2, title: "<b>仓库货架</b>系统", description: "<b>垂直</b>空间容量" },
          { id: 3, title: "<b>塑料</b>托盘", description: "高耐用性与<b>优质</b>" },
          { id: 4, title: "<b>物流</b>解决方案", description: "来自<b>专家</b>的一站式服务" }
        ],
  }
}

export function Hero({ locale = "id" }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Mengambil data berdasarkan locale aktif (fallback ke 'id' jika tidak ditemukan)
  const data = heroData[locale] || heroData["id"]
  const isMandarin = locale?.startsWith("zh") ?? false
  const finalSteps = data.steps || []

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0c1a30]" id="home">
      {mounted && (
        <div 
          className="absolute inset-0 h-full w-full will-change-transform" 
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="h-full w-full object-cover opacity-45" 
            src="/videos/hero.webm" 
          />
        </div>
      )}

      {/* Overlay Lapisan Gradient */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none" 
        style={{ backgroundImage: `linear-gradient(180deg, rgba(12, 26, 48, 0.85) 0%, rgba(12, 26, 48, 0.65) 60%, #0c1a30 100%)` }} 
      />

      {/* Konten Utama Container */}
      <div className="relative z-20 mx-auto flex h-full max-w-5xl flex-col justify-center items-center px-6 text-center">
        
        {/* Badge Atas */}
        {data.hero_badge && (
          <div className="flex items-center gap-2.5 border-l-2 border-amber-400 pl-3 text-left self-center sm:self-auto">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Keylock Indonesia</span>
            <span className="text-[9px] font-medium text-slate-600">•</span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400">
              {data.hero_badge}
            </span>
          </div>
        )}
        
        {/* Judul Utama */}
        {data.title && (
          <h1 className="mt-6 text-balance font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl tracking-tight drop-shadow-sm">
            {data.title}
          </h1>
        )}
        
        {/* Deskripsi Subtitle */}
        {data.subtitle && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg drop-shadow mx-auto">
            {data.subtitle}
          </p>
        )}
        
        {/* Baris Tombol CTA */}
        <div className="mt-9 mb-16 flex flex-col gap-3.5 sm:flex-row w-full sm:w-auto justify-center">
          {data.cta_text && (
            <a 
              href={data.hero_cta_link || "#contact"} 
              className="inline-flex h-11 items-center justify-center gap-1 rounded-lg bg-amber-400 px-6 text-sm font-semibold text-[#0c1a30] transition-all hover:bg-amber-300 shadow-lg shadow-amber-500/10 w-full sm:w-auto"
            >
              {data.cta_text} <ArrowRight className="ml-1 size-4" />
            </a>
          )}

          {data.cta_text2 && (
            <a 
              href={data.hero_cta_link2} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex h-11 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
            >
              {isMandarin ? <MessageSquare className="mr-2 size-4 text-emerald-400" /> : <Phone className="mr-2 size-4 text-amber-400" />}
              {data.cta_text2}
            </a>
          )}
        </div>

    
        {/* 4 Grid Solusi Terintegrasi Dinamis - Card Lebar tapi Tetap Pendek */}
        {finalSteps.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 w-full max-w-5xl mx-auto px-4">
            {finalSteps.map((item: any) => (
              <div 
                key={item.id} 
                className="px-5 py-3 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-center"
              >
                <p 
                  className="text-[11px] font-bold text-white uppercase tracking-wider truncate [&>b]:text-amber-400" 
                  dangerouslySetInnerHTML={{ __html: item.title }} 
                />
                <p 
                  className="text-[10px] text-slate-400 mt-0.5 leading-tight truncate [&>b]:text-amber-300" 
                  dangerouslySetInnerHTML={{ __html: item.description }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>
    

      {/* Background Grid Pattern dekoratif */}
      <div className="absolute inset-0 z-15 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
    </section>
  )
}