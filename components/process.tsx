"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "./reveal"
import { MessageSquare, MapPinned, PencilRuler, Wrench, LifeBuoy, HelpCircle } from "lucide-react"

const HARDCODED_PROCESS_ICONS = [
  MessageSquare, // Langkah 1
  MapPinned,     // Langkah 2
  PencilRuler,   // Langkah 3
  Wrench,        // Langkah 4
  LifeBuoy,      // Langkah 5
]

const CONTENT_DICTIONARY: Record<string, { badge: string; title: string; subtitle: string; steps: any[] }> = {
  id: {
    badge: "ALUR KERJA",
    title: "Proses Kerja Kami",
    subtitle: "Tahapan terstruktur dari konsultasi awal hingga pemeliharaan sistem jangka panjang.",
    steps: [
      { id: 1, title: "Konsultasi Kebutuhan", description: "Diskusi mendalam mengenai tipe penguncian dan kebutuhan spesifik armada gudang Anda." },
      { id: 2, title: "Survei Lokasi Gratis", description: "Tim teknis melakukan analisis fisik lapangan untuk pemetaan instalasi komponen optimal." },
      { id: 3, title: "Rekomendasi Solusi", description: "Penyusunan rancangan proposal penawaran spesifikasi produk perlindungan terbaik." },
      { id: 4, title: "Instalasi & Uji Layak", description: "Pemasangan unit oleh teknisi ahli diikuti pengujian fungsionalitas sistem menyeluruh." },
      { id: 5, title: "Jaminan Pemeliharaan", description: "Layanan purnajual komprehensif untuk memastikan seluruh instrumen beroperasi prima." }
    ]
  },
  en: {
    badge: "WORKFLOW",
    title: "Our Operational Process",
    subtitle: "Structured stages from initial consultation to long-term system maintenance.",
    steps: [
      { id: 1, title: "Needs Consultation", description: "In-depth discussion regarding lock types and specific requirements for your fleet or warehouse." },
      { id: 2, title: "Free Site Survey", description: "Technical team conducts on-site analysis for optimal component installation mapping." },
      { id: 3, title: "Solution Proposal", description: "Drafting layout proposals and offering the finest protection product specifications." },
      { id: 4, title: "Installation & Testing", description: "Unit deployment by master technicians followed by full system operational tryouts." },
      { id: 5, title: "Maintenance Support", description: "Comprehensive after-sales service to guarantee all instruments perform at their peak." }
    ]
  },
  "zh-Hans": {
    badge: "作业流程",
    title: "我们的标准作业流程",
    subtitle: "从最初的一对一深度咨询到长期的系统技术维护，提供全方位结构化的阶段服务。",
    steps: [
      { id: 1, title: "核心需求咨询", description: "深入讨论适合您具体业务的智能锁具类型，以及车队或工业仓库的专属安全防护技术指标。" },
      { id: 2, title: "免费现场勘测", description: "派遣资深技术团队前往现场进行深度物理环境分析，以制定精细化的安全组件工程安装映射方案。" },
      { id: 3, title: "定制方案建议", description: "根据现场数据，精心编纂高效的规划技术提案，并提供最优质、高性价比的工业级防护产品配置单。" },
      { id: 4, title: "专业安装与测试", description: "由持证资深工程技术人员进行现场硬件部署，紧接着进行严苛的全面系统集成全功能性联动运行测试。" },
      { id: 5, title: "长期全维技术维护", description: "提供全天候的售后技术支持保障，定期追踪设备健康度，确保所有安全终端始终保持巅峰作业性能。" }
    ]
  }
}

interface ProcessProps {
  locale?: string; 
}

export function Process({ locale = "id" }: ProcessProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"];

  if (!isMounted) {
    return <section className="bg-secondary py-24" />
  }

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={currentContent.badge}
          title={currentContent.title}
          subtitle={currentContent.subtitle}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-5">
          {currentContent.steps.map((s: any, i: number) => {
            const IconComponent = HARDCODED_PROCESS_ICONS[i] || HelpCircle;

            return (
              <motion.div
                key={s.id || s.title || i}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
              >
                {/* Garis penghubung antar langkah */}
                {i < currentContent.steps.length - 1 && (
                  <div className="absolute left-1/2 top-7 hidden h-0.5 w-full bg-gradient-to-r from-amber-300 to-transparent md:block" />
                )}
                
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="relative z-10 flex size-14 items-center justify-center rounded-full bg-navy text-amber-400 shadow-lg">
                    <IconComponent className="size-6" />
                    <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-amber-400 text-xs font-bold text-navy">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-heading text-base font-bold text-navy">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-steel">{s.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}