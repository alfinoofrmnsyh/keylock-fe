"use client"

import { useState, useEffect } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { Forklift, CalendarClock, LayoutGrid, Container, HelpCircle } from "lucide-react"

const HARDCODED_SERVICES_ICONS = [
  Forklift,       // Layanan 1 (index 0)
  CalendarClock,  // Layanan 2 (index 1)
  LayoutGrid,     // Layanan 3 (index 2)
  Container,      // Layanan 4 (index 3)
]

interface ServicesProps {
  locale?: string;
}

// Kamus data statis untuk section Services
const servicesContent: Record<string, any> = {
  id: {
    badge: "Layanan Utama Kami",
    title: "Solusi Pergudangan & Logistik Komprehensif",
    subtitle: "Kami menghadirkan rangkaian opsi terintegrasi untuk memperlancar perputaran material logistik rantai pasok industri Anda.",
    services: [
      {
        id: 1,
        title: "Penjualan & Sewa Forklift",
        description: "Penyediaan unit forklift premium untuk kebutuhan jangka pendek maupun panjang dengan performa optimal.",
        features: ["Kapasitas beban 1 hingga 20 Ton", "Pilihan mesin Diesel, Battery & Elektrik", "Perawatan berkala penuh secara gratis"]
      },
      {
        id: 2,
        title: "Sistem Racking Gudang",
        description: "Rancang bangun, tata letak, dan instalasi struktur rak industri untuk mengoptimalkan ruang penyimpanan vertikal.",
        features: ["Selective Pallet Racking", "Drive-In & Cantilever Systems", "Baja struktural berstandar SNI & aman"]
      },
      {
        id: 3,
        title: "Palet Plastik Berkualitas",
        description: "Distribusi palet plastik tangguh yang higienis, berdaya tahan tinggi, dan ideal untuk penanganan beban berat.",
        features: ["Resisten cuaca ekstrim & bahan kimia", "Permukaan anti-slip khusus", "Sertifikasi standar ekspor & Food Grade"]
      },
      {
        id: 4,
        title: "Konsultasi & Perawatan",
        description: "Layanan purnajual komprehensif, inspeksi kelayakan struktur berkala, dan pasokan suku cadang asli.",
        features: ["Tim teknisi siaga darurat 24/7", "Jaminan suku cadang original pabrikan", "Audit keselamatan operasional berkala"]
      }
    ]
  },
  en: {
    badge: "Our Core Services",
    title: "Comprehensive Warehousing & Logistics Solutions",
    subtitle: "We deliver an integrated suite of premium equipment options to keep your industrial supply chain moving efficiently.",
    services: [
      {
        id: 1,
        title: "Forklift Sales & Rental",
        description: "Providing premium material handling forklift units for short or long-term operational schedules with top tier performance.",
        features: ["1 to 20 Tons load capacity", "Diesel, Battery & Electric options available", "Free routine and preventive maintenance"]
      },
      {
        id: 2,
        title: "Warehouse Racking System",
        description: "Industrial rack layout structural engineering design, supply, and implementation to maximize vertical spaces.",
        features: ["Selective Pallet Racking setups", "Drive-In & Cantilever specialized systems", "Certified safe high-grade structural steel"]
      },
      {
        id: 3,
        title: "Premium Plastic Pallets",
        description: "Distribution of ultra-durable, hygienic, and high load capacity plastic pallets designed for intensive workflows.",
        features: ["Weatherproof & chemical high resistance", "Engineered anti-slip surface pattern", "Export certified & Food Grade compliance"]
      },
      {
        id: 4,
        title: "Maintenance & Consultation",
        description: "Dedicated after-sales support ecosystem, structured load certifications, and emergency spare part procurement.",
        features: ["24/7 Emergency support technician crew", "Genuine OEM factory spare parts inventory", "Periodic operational safety compliance audit"]
      }
    ]
  },
  "zh-Hans": {
    badge: "我们的核心服务",
    title: "全面的仓储与一体化物流解决方案",
    subtitle: "我们提供完整的优质仓储配套设备链，以确保您的工业供应链高效率顺畅运转。",
    services: [
      {
        id: 1,
        title: "叉车销售与租赁",
        description: "提供高性能的优质物料搬运叉车单元，全面满足您短期或长期的定制化工业项目作业需求。",
        features: ["1至20吨额定载荷能力", "内燃、蓄电池及纯电动动力可选", "免费提供全面的定期预防性全包保养"]
      },
      {
        id: 2,
        title: "仓库货架系统",
        description: "提供专业的立体仓储货架结构工程规划、设计与安全安装，全面盘活与最大化您的垂直垂直高位空间。",
        features: ["重型托盘式货架配置", "贯通式与悬臂式特种货架系统", "经过官方安全认证的高强度优质结构钢"]
      },
      {
        id: 3,
        title: "高品质塑料托盘",
        description: "高效分销高承载、高强度且卫生的工业级塑料托盘，专为密集型高负荷周转物流链打造。",
        features: ["优异的耐候性与耐化学腐蚀能力", "表面工程学防滑纹理结构设计", "符合全球出口认证及食品级安全标准"]
      },
      {
        id: 4,
        title: "全维维护保养与咨询",
        description: "完善周密的售后技术支持保障、货架结构承重安全认证以及及时的正品零部件供应储备。",
        features: ["24/7 紧急突发状况技术专家驻场团队", "原厂正品 OEM 备件全线库存保障", "定期提供作业合规安全和技术审计服务"]
      }
    ]
  }
}

export function Services({ locale = "id" }: ServicesProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <section id="services" className="relative bg-secondary py-24" />
  }

  // Ambil data statis berdasarkan locale aktif
  const data = servicesContent[locale] || servicesContent["id"]

  return (
    <section id="services" className="relative bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.services?.map((s: any, i: number) => {
            const IconComponent = HARDCODED_SERVICES_ICONS[i] || HelpCircle;

            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-amber-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconComponent className="size-6" />
                  </div>
                  
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{s.description}</p>
                  
                  <ul className="mt-4 space-y-2">
                    {s.features?.map((feat: string, featIndex: number) => (
                      <li key={featIndex} className="flex items-center gap-2 text-sm text-navy">
                        <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
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