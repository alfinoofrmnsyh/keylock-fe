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
    description: "Menjaga kelancaran aliran material di gudang membutuhkan lebih dari sekadar peralatan yang fungsional. Kami hadir menyediakan ekosistem terintegrasi untuk memastikan produktivitas pergudangan Anda tetap berada pada level tertinggi dengan armada yang andal dan aman.",
    bullet_points: [
      { id: 1, text: "Layanan Dukungan Teknis Profesional" },
      { id: 2, text: "Operator & Teknisi Tersertifikasi Resmi" },
      { id: 3, text: "Unit Forklift Terbaru & Selalu Terawat" },
      { id: 4, text: "Jangkauan Layanan Luas di Kawasan Industri" }
    ],
    stats: [
      { id: 1, value: 10, suffix: "+", label: "Tahun Pengalaman" },
      { id: 2, value: 500, suffix: "+", label: "Kapasitas Racking (Pallet)" },
      { id: 3, value: 150, suffix: "+", label: "Unit Forklift Aktif" },
      { id: 4, value: 99, suffix: "%", label: "Tingkat Kepuasan Klien" }
    ]
  },
  en: {
    badge: "Trusted Logistics Partner",
    title: "Warehouse Equipment Solutions to Minimize Workplace Risks & Downtime",
    description: "Maintaining smooth material flow in a warehouse requires more than just functional equipment. We are here to provide an integrated ecosystem to ensure your warehousing productivity stays at its peak with reliable and safe fleets.",
    bullet_points: [
      { id: 1, text: "Professional Technical Support Services" },
      { id: 2, text: "Officially Certified Operators & Technicians" },
      { id: 3, text: "Latest & Fully Maintained Forklift Units" },
      { id: 4, text: "Wide Service Coverage Across Industrial Areas" }
    ],
    stats: [
      { id: 1, value: 10, suffix: "+", label: "Years of Experience" },
      { id: 2, value: 500, suffix: "+", label: "Racking Capacity (Pallets)" },
      { id: 3, value: 150, suffix: "+", label: "Active Forklift Units" },
      { id: 4, value: 99, suffix: "%", label: "Client Satisfaction Rate" }
    ]
  },
  "zh-Hans": {
    badge: "卓越物流合作伙伴",
    title: "仓储设备解决方案，最大程度减少安全风险与停机时间",
    description: "保持仓库中物料流动的顺畅不仅需要功能性的设备。我们致力于为您提供一个完整的集成生态系统，通过高效、安全的车队确保您的仓储生产力始终保持在最高水平。",
    bullet_points: [
      { id: 1, text: "专业及时的技术支持服务" },
      { id: 2, text: "持有官方执照的操作员与技师" },
      { id: 3, text: "最新且保养完美的叉车单元" },
      { id: 4, text: "广泛覆盖各大工业园区的服务网络" }
    ],
    stats: [
      { id: 1, value: 10, suffix: "+", label: "行业经验 (年)" },
      { id: 2, value: 500, suffix: "+", label: "货架容量 (托盘)" },
      { id: 3, value: 150, suffix: "+", label: "活跃叉车单元" },
      { id: 4, value: 99, suffix: "%", label: "客户满意度" }
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