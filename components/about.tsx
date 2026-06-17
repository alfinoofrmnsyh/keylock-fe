"use client"

import { useState, useEffect } from "react"
import { Counter } from "./counter"
import { Reveal } from "./reveal"
import { ListChecks, Boxes, Forklift, ShieldCheck, HelpCircle } from "lucide-react"

const HARDCODED_ICONS = [
  ListChecks,   // Kotak 1
  Boxes,        // Kotak 2
  Forklift,     // Kotak 3
  ShieldCheck,  // Kotak 4
]

interface AboutProps {
  locale?: string;
}

// Kamus data statis untuk section About
const aboutContent: Record<string, any> = {
  id: {
    badge: "Mitra Logistik Terpercaya",
    title: "Solusi Peralatan Gudang untuk Meminimalkan Risiko Kerja & Downtime",
    description: "Menjaga kelancaran alur material di gudang memerlukan lebih dari sekadar peralatan yang fungsional. Kami memahami ketatnya regulasi kesehatan dan keselamatan kerja (K3) di lingkungan industri Anda. Oleh karena itu, Keylock Indonesia memastikan setiap armada forklift siap digunakan dengan dokumen SIA (Surat Izin Alat) dan SIO (Surat Izin Operator) yang valid dan aktif. Kami bermitra dengan Anda untuk menjaga standar keselamatan tertinggi, meminimalkan risiko kecelakaan kerja, dan memastikan operasional Anda selalu lolos setiap audit keselamatan.",
    bullet_points: [
      { id: 1, text: "Unit yang patuh regulasi (SIA & SIO Aktif)" },
      { id: 2, text: "Armada bersertifikasi K3 tingkat atas" },
      { id: 3, text: "Jaminan unit cadangan untuk mencegah downtime" },
      { id: 4, text: "Kontrak fleksibel & penghematan CAPEX" }
    ],
    stats: [
      { id: 1, value: 1000, suffix: "+", label: "Proyek Terselesaikan" },
      { id: 2, value: 500, suffix: "+", label: "Klien Mitra" },
      { id: 3, value: "24/7", label: "Dukungan Teknis" },
      { id: 4, value: 100, suffix: "%", label: "Sertifikasi K3 Lengkap" }
    ]
  },
  en: {
    badge: "Trusted Logistics Partner",
    title: "Warehouse Equipment Solutions to Minimize Workplace Risks & Downtime",
    description: "Maintaining smooth material flow in a warehouse requires more than just functional equipment. We understand the strict occupational health and safety (OHS/K3) regulations in your industrial environment. Therefore, Keylock Indonesia ensures every forklift fleet is ready for use with valid and active SIA (Equipment License) and SIO (Operator License) documents. We partner with you to maintain the highest safety standards, minimize workplace incident risks, and ensure your operations always pass every safety audit.",
    bullet_points: [
      { id: 1, text: "Regulation-compliant units (Active SIA & SIO)" },
      { id: 2, text: "Top-tier OHS/K3-certified fleet" },
      { id: 3, text: "Guaranteed back-up units to prevent downtime" },
      { id: 4, text: "Flexible contracts & CAPEX savings" }
    ],
    stats: [
      { id: 1, value: 1000, suffix: "+", label: "Completed Projects" },
      { id: 2, value: 500, suffix: "+", label: "Partner Clients" },
      { id: 3, value: 24/7, label: "Technical Support" },
      { id: 4, value: 100, suffix: "%", label: "Extensive K3 Certification" }
    ]
  },
  "zh-Hans": {
    badge: "值得信赖的物流合作伙伴",
    title: "仓库设备解决方案，旨在最大限度地降低工作场所风险与停机时间",
    description: "维持仓库内顺畅的物料流转不仅仅需要功能齐全的设备。我们深知您工业环境中严苛的职业健康与安全 (OHS/K3) 法规。因此，Keylock Indonesia 确保每一台叉车车队都持有有效且激活的 SIA（设备许可证）和 SIO（操作员许可证）文件，随时可供使用。我们与您合作，共同维护最高的安全标准，最大限度地减少工作场所事故风险，并确保您的运营始终通过各项安全审计。",
    bullet_points: [
      { id: 1, text: "符合法规的单位（有效的 SIA 和 SIO）" },
      { id: 2, text: "顶级 OHS/K3 认证车队" },
      { id: 3, text: "提供备用单位，防止停机" },
      { id: 4, text: "灵活的合同与资本支出 (CAPEX) 节省" }
    ],
    stats: [
      { id: 1, value: 1000, suffix: "+", label: "已完成项目" },
      { id: 2, value: 500, suffix: "+", label: "合作伙伴客户" },
      { id: 3, value: "24/7", label: "技术支持" },
      { id: 4, value: 100, suffix: "%", label: "全面的 K3 认证" }
    ]
  }
}

export function About({ locale = "id" }: AboutProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <section id="about" className="relative bg-background py-24" />
  }

  // Ambil data statis sesuai bahasa aktif
  const data = aboutContent[locale] || aboutContent["id"]

  return (
    <section id="about" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* SISI KIRI: Konten Teks */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              {data.badge}
            </span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-steel">
              {data.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.bullet_points?.map((item: any) => (
                <li key={item.id} className="flex items-center gap-2 text-sm text-navy">
                  <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* SISI KANAN: Grid Statistik */}
          <div className="grid grid-cols-2 gap-4">
            {data.stats?.map((s: any, i: number) => {
              const IconComponent = HARDCODED_ICONS[i] || HelpCircle

              return (
                <Reveal key={s.id} delay={i * 0.1}>
                  <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
                    <IconComponent className="size-7 text-navy transition-colors group-hover:text-amber-500" />
                    <div className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
                      {/* Nilai angka murni dan suffix langsung disuplai tanpa regex parsing */}
                      <Counter to={s.value} suffix={s.suffix} />
                    </div>
                    <p className="mt-1 text-sm font-medium text-steel">{s.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  )
}