"use client"

import { useState, useEffect } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { Forklift, CalendarClock, LayoutGrid, Container, HelpCircle, Wrench, Scale } from "lucide-react"

// Tambahkan ikon baru: Wrench dan Scale
const HARDCODED_SERVICES_ICONS = [
  Forklift,       // 1
  CalendarClock,  // 2
  LayoutGrid,     // 3
  Container,      // 4
  Wrench,         // 5
  Scale,          // 6
]

interface ServicesProps {
  locale?: string;
}

const servicesContent: Record<string, any> = {
  id: {
    badge: "Layanan Utama Kami",
    title: "Solusi Pergudangan & Logistik Komprehensif",
    subtitle: "Kami menghadirkan rangkaian opsi terintegrasi untuk memperlancar perputaran material logistik rantai pasok industri Anda.",
    services: [
      { id: 1, title: "Penjualan & Sewa Forklift", description: "Penyediaan unit forklift premium untuk kebutuhan jangka pendek maupun panjang.", features: ["Kapasitas 1-20 Ton", "Diesel, Battery & Elektrik", "Perawatan berkala gratis"] },
      { id: 2, title: "Sistem Racking Gudang", description: "Rancang bangun dan instalasi struktur rak untuk memaksimalkan ruang vertikal.", features: ["Selective Pallet Racking", "Drive-In & Cantilever", "Baja struktural aman"] },
      { id: 3, title: "Palet Plastik Berkualitas", description: "Distribusi palet plastik tangguh, higienis, dan ideal untuk beban berat.", features: ["Resisten cuaca & kimia", "Permukaan anti-slip", "Sertifikasi Food Grade"] },
      { id: 5, title: "Perkakas & Peralatan Industri", description: "Penyediaan peralatan performa tinggi termasuk power tools dan kipas industri.", features: ["Perkakas listrik tugas berat", "Kipas pendingin kecepatan tinggi", "Solusi ventilasi"] },
      { id: 6, title: "Timbangan Digital & Truk", description: "Solusi penimbangan presisi untuk inventaris gudang dan akurasi logistik.", features: ["Timbangan platform digital", "Timbangan truk tugas berat", "Layanan kalibrasi"] }
    ]
  },
  en: {
    badge: "Our Core Services",
    title: "Integrated Material Handling Management Solutions",
    subtitle: "Everything you need to move, store, and manage your material flow efficiently and safely.",
    services: [
      { id: 1, title: "Forklift Sales & Rental", description: "Providing premium forklift units for short or long-term operational schedules.", features: ["1 to 20 Tons capacity", "Diesel, Battery & Electric", "Free maintenance"] },
      { id: 2, title: "Warehouse Racking System", description: "Industrial rack layout design, supply, and implementation to maximize spaces.", features: ["Selective Pallet Racking", "Drive-In & Cantilever", "High-grade steel"] },
      { id: 3, title: "Premium Plastic Pallets", description: "Distribution of ultra-durable, hygienic, and high load capacity plastic pallets.", features: ["Weatherproof & chemical resistant", "Anti-slip surface", "Food Grade compliance"] },

      { id: 5, title: "Industrial Tools & Equipment", description: "Supply of high-performance industrial tools, including heavy-duty power tools and fans.", features: ["Heavy-duty power tools", "High-velocity cooling fans", "Energy-efficient ventilation"] },
      { id: 6, title: "Digital & Truck Weighing Systems", description: "Precision weighing solutions for inventory and logistical accuracy.", features: ["Digital platform scales", "Industrial truck scales", "Calibration services"] }
    ]
  },
  "zh-Hans": {
    badge: "我们的核心服务",
    title: "全面的仓储与一体化物流解决方案",
    subtitle: "我们提供完整的优质仓储配套设备链，以确保您的工业供应链高效率顺畅运转。",
    services: [
      { id: 1, title: "叉车销售与租赁", description: "提供高性能的优质物料搬运叉车，满足短期或长期作业需求。", features: ["1至20吨载荷", "内燃/电池/电动可选", "免费全包保养"] },
      { id: 2, title: "仓库货架系统", description: "专业的立体仓储货架规划、设计与安全安装，优化垂直空间。", features: ["重型托盘货架", "贯通式/悬臂式", "优质结构钢"] },
      { id: 3, title: "高品质塑料托盘", description: "高效分销高承载、高强度且卫生的工业级塑料托盘。", features: ["耐候与耐腐蚀", "防滑纹理设计", "食品级安全标准"] },

      { id: 5, title: "工业工具与设备", description: "提供高性能工业工具，包括重型电动工具和高转速工业风扇。", features: ["重型电动工具", "工业冷却风扇", "高效通风方案"] },
      { id: 6, title: "数字秤与地磅称重系统", description: "精密称重解决方案，涵盖仓库库存秤与重型卡车地磅。", features: ["高精度数字平台秤", "重型工业卡车地磅", "校准测试服务"] }
    ]
  }
}

export function Services({ locale = "id" }: ServicesProps) {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => { setIsMounted(true) }, [])

  if (!isMounted) return <section id="services" className="relative bg-secondary py-24" />

  const data = servicesContent[locale] || servicesContent["id"]

  return (
    <section id="services" className="relative bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow={data.badge} title={data.title} subtitle={data.subtitle} />

        {/* Grid diubah menjadi lg:grid-cols-6 */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {data.services?.map((s: any, i: number) => {
            const IconComponent = HARDCODED_SERVICES_ICONS[i] || HelpCircle;
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="group relative h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-navy text-amber-400">
                    <IconComponent className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-sm font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-steel">{s.description}</p>
                  <ul className="mt-3 space-y-1.5">
                    {s.features?.map((feat: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] text-navy">
                        <span className="size-1 shrink-0 rounded-full bg-amber-400" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  )
}