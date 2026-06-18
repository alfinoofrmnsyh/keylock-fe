"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Phone, MessageSquare } from "lucide-react"
import Image from "next/image" // 1. Impor komponen Image dari Next.js

interface HeroProps {
  locale?: string;
}

const heroData: Record<string, any> = {
  id: {
    hero_badge: "Spesialis Material Handling & Racking",
    title: "Maksimalkan Kapasitas Ruang & Efisiensi Gudang Anda",
    subtitle: "Kami menyediakan unit Forklift (baru/bekas), Pallet Plastik, Industrial Tools, Truck Scale, dan Rak Gudang berkualitas. Solusi satu pintu untuk meningkatkan efisiensi operasional pabrik Anda.",
    cta_text: "Minta Penawaran",
    hero_cta_link: "https://wa.me/6289699392924",
    cta_text2: "Konsultasi Penjualan (WA)",
    hero_cta_link2: "https://wa.me/625173013525",
    steps: [
      { id: 1, title: "Jual & Sewa <b>Forklift</b>", description: "Ketersediaan forklift <b>bergaransi</b>" },
      { id: 2, title: "Sistem <b>Racking Gudang</b>", description: "Kapasitas ruang <b>vertikal</b>" },
      { id: 3, title: "Palet <b>Plastik</b>", description: "Daya tahan tinggi & <b>berkualitas</b>" },
      { id: 4, title: "Solusi <b>Logistik</b>", description: "Layanan satu pintu dari para <b>ahli</b>" }
    ],
    gads_label_cta1: "8m9jCPu8sEceLCd9_xD",
    gads_label_cta2: "8m9jCPu8sEceLCd9_xD"
  },
  en: {
    hero_badge: "Material Handling & Racking Specialist",
    title: "Maximize Your Space Capacity & Warehouse Efficiency",
    subtitle: "We provide new & used Forklifts, Plastic Pallets, Industrial Tools, Truck Scales, and Storage Racks. A one-stop solution to maximize your factory's operational efficiency.",
    cta_text: "Request a Quote",
    hero_cta_link: "https://wa.me/6289699392924",
    cta_text2: "Sales Consultation (WA)",
    hero_cta_link2: "https://wa.me/625173013525",
    steps: [
      { id: 1, title: "<b>Forklift</b> Sales & Rental", description: "<b>Guaranteed</b> forklift availability" },
      { id: 2, title: "Warehouse <b>Racking</b>", description: "<b>Vertical</b> space capacity" },
      { id: 3, title: "<b>Plastic</b> Pallets", description: "High durability & <b>quality</b>" },
      { id: 4, title: "<b>Logistics</b> Solutions", description: "One-stop service from <b>experts</b>" }
    ],
    gads_label_cta1: "8m9jCPu8sEceLCd9_xD",
    gads_label_cta2: "8m9jCPu8sEceLCd9_xD"
  },
  "zh-Hans": {
    hero_badge: "物料搬运与仓储货架专家",
    title: "最大化您的空间容量与仓库效率",
    subtitle: "我们提供优质叉车销售与租赁、仓库货架系统以及高品质塑料托盘的集成服务。旨在最大程度减少停机时间并优化您的物流流程。",
    cta_text: "索取报价",
    hero_cta_link: "https://wa.me/6289699392924",
    cta_text2: "销售咨询 (微信)",
    hero_cta_link2: "/images/wechat-qr.jpeg",
    steps: [
      { id: 1, title: "<b>叉车</b>销售与租赁", description: "<b>有保障的</b>叉车供应" },
      { id: 2, title: "<b>仓库货架</b>系统", description: "<b>垂直</b>空间容量" },
      { id: 3, title: "<b>塑料</b>托盘", description: "高耐用性与<b>优质</b>" },
      { id: 4, title: "<b>物流</b>解决方案", description: "来自<b>专家</b>的一站式服务" }
    ],
    gads_label_cta1: "8m9jCPu8sEceLCd9_xD",
    gads_label_cta2: "8m9jCPu8sEceLCd9_xD"
  }
}

export function Hero({ locale = "id" }: HeroProps) {
  const [scrollY, setScrollY] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [showWechatQR, setShowWechatQR] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const trackGadsConversion = (label: string) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `AW-18247175856/${label}`,
      });
    }
  }

  const data = heroData[locale] || heroData["id"]
  const isMandarin = locale?.startsWith("zh") ?? false
  const finalSteps = data.steps || []

  return (
    <section className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-[#0c1a30] flex items-center pt-24 pb-12 lg:py-0" id="home">
      {mounted && (
        <div 
          className="absolute inset-0 h-full w-full will-change-transform" 
          style={{ transform: `translateY(${scrollY * 0.35}px)` }}
        >
          {/* Optimasi Video: Menambahkan preload="none" agar tidak membeku saat inisialisasi awal */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="none"
            className="h-full w-full object-cover opacity-45" 
            src="/videos/hero.webm" 
          />
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: `linear-gradient(180deg, rgba(12, 26, 48, 0.9) 0%, rgba(12, 26, 48, 0.7) 60%, #0c1a30 100%)` }} />

      <div className="relative z-20 mx-auto flex w-full max-w-5xl flex-col justify-center items-center px-6 text-center my-auto">
        
        {data.hero_badge && (
          <div className="flex flex-wrap justify-center items-center gap-1.5 sm:gap-2.5 border-l-2 border-amber-400 pl-3 text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Keylock Indonesia</span>
            <span className="text-[10px] font-medium text-slate-600 hidden sm:inline">•</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block sm:inline">
              {data.hero_badge}
            </span>
          </div>
        )}
        
        {data.title && (
          <h1 className="mt-5 text-balance font-heading text-2xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight drop-shadow-sm">
            {data.title}
          </h1>
        )}
        
        {data.subtitle && (
          <p className="mt-4 max-w-2xl text-sm sm:text-lg leading-relaxed text-slate-300 drop-shadow mx-auto">
            {data.subtitle}
          </p>
        )}
        
        <div className="mt-8 mb-12 flex flex-col gap-3 sm:flex-row w-full sm:w-auto justify-center px-4 sm:px-0">
          {data.cta_text && (
            <a 
              href={data.hero_cta_link || "#contact"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackGadsConversion(data.gads_label_cta1)} 
              className="inline-flex h-12 items-center justify-center gap-1 rounded-lg bg-amber-400 px-6 text-sm font-semibold text-[#0c1a30] transition-all hover:bg-amber-300 shadow-lg shadow-amber-500/10 w-full sm:w-auto"
            >
              {data.cta_text} <ArrowRight className="ml-1 size-4" />
            </a>
          )}

          {data.cta_text2 &&
            (isMandarin ? (
              <button
                onClick={() => {
                  setShowWechatQR(true);
                  trackGadsConversion(data.gads_label_cta2);
                }}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                <MessageSquare className="mr-2 size-4 text-emerald-400" />
                {data.cta_text2}
              </button>
            ) : (
              <a
                href={data.hero_cta_link2}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackGadsConversion(data.gads_label_cta2)}
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white transition-colors hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto"
              >
                <Phone className="mr-2 size-4 text-amber-400" />
                {data.cta_text2}
              </a>
            ))}
        </div>

        {finalSteps.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 w-full max-w-5xl mx-auto">
            {finalSteps.map((item: any) => (
              <div 
                key={item.id} 
                className="px-4 py-3.5 rounded-lg border border-white/10 bg-white/[0.03] backdrop-blur-md flex flex-col justify-center text-center"
              >
                <p 
                  className="text-[12px] font-bold text-white uppercase tracking-wider leading-snug [&>b]:text-amber-400" 
                  dangerouslySetInnerHTML={{ __html: item.title }} 
                />
                <p 
                  className="text-[11px] text-slate-400 mt-1 leading-normal [&>b]:text-amber-300" 
                  dangerouslySetInnerHTML={{ __html: item.description }} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute inset-0 z-15 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {showWechatQR && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 px-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900">WeChat</h3>
            <p className="mt-2 text-sm text-slate-500">Scan QR Code below to contact our sales team.</p>
            
            {/* Optimasi Gambar: Mengubah img ke Next.js Image dengan kompresi otomatis */}
            <div className="mx-auto mt-5 relative w-64 h-64 border border-slate-200 rounded-lg overflow-hidden">
              <Image 
                src="/images/wechat-qr.jpeg" 
                alt="WeChat QR Code" 
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>

            <button onClick={() => setShowWechatQR(false)} className="mt-6 w-full rounded-lg bg-slate-900 py-3 text-sm font-semibold text-white hover:bg-slate-800">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}