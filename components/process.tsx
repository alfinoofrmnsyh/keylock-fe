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
    badge: "ALUR KERJA KAMI",
    title: "Tahapan Terstruktur Menuju Efisiensi Logistik",
    subtitle: "Mulai dari diskusi awal hingga jaminan perawatan jangka panjang, setiap proses dirancang secara terukur untuk kelancaran operasional Anda.",
    steps: [
      { id: 1, title: "Konsultasi Kebutuhan", description: "Diskusi mendalam untuk memahami jenis komoditas, volume alur material, dan target efisiensi gudang Anda." },
      { id: 2, title: "Survei Lokasi Gratis", description: "Inspeksi langsung ke fasilitas Anda untuk mengukur tata letak secara presisi dan memetakan jalur manuver." },
      { id: 3, title: "Rekomendasi Solusi", description: "Formulasi spesifikasi armada yang tepat beserta perencanaan tata letak kustom yang memaksimalkan kapasitas ruang." },
      { id: 4, title: "Instalasi & Komisioning", description: "Pemasangan sistem rak yang terukur dan serah terima unit siap kerja yang mematuhi standar regulasi keselamatan." },
      { id: 5, title: "Jaminan Perawatan", description: "Dukungan teknis berkala dan respon darurat yang cepat untuk menjaga stabilitas produktivitas logistik Anda." }
    ]
  },
  en: {
    badge: "OUR WORKFLOW",
    title: "Structured Stages Toward Logistics Efficiency",
    subtitle: "From initial discussions to long-term maintenance guarantees, every process is measurably designed for your smooth operations.",
    steps: [
      { id: 1, title: "Needs Consultation", description: "In-depth discussions to understand commodity types, material flow volume, and your warehouse efficiency targets." },
      { id: 2, title: "Free Site Survey", description: "Direct on-site inspection of your facility to precisely measure the layout and map out maneuvering paths." },
      { id: 3, title: "Solution Recomendation", description: "Formulation of specific fleet specifications along with custom layout planning that maximizes space capacity." },
      { id: 4, title: "Installation & Commissioning", description: "Installation of measured racking systems and handover of ready-to-work units compliant with safety regulatory standards." },
      { id: 5, title: "Maintenance Guarantee", description: "Periodic technical support and rapid emergency response to maintain the stability of your logistics productivity." }
    ]
  },
  "zh-Hans": {
    badge: "我们的工作流程",
    title: "实现物流效率的结构化步骤",
    subtitle: "从初步讨论到长期的维护保障，每一道工序都经过精准设计，旨在确保您的运营顺畅无阻。",
    steps: [
      { id: 1, title: "需求咨询", description: "深入探讨以了解商品类型、物流动线规模以及您的仓库效率目标。" },
      { id: 2, title: "免费现场勘测", description: "对您的设施进行实地考察，精准测量布局并规划操作路径。" },
      { id: 3, title: "解决方案建议", description: "制定具体的车队规格，并配合定制化的布局规划，以最大化空间容量。" },
      { id: 4, title: "安装与调试", description: "安装测绘好的货架系统，并交付符合安全监管标准的准备就绪设备。" },
      { id: 5, title: "维护保障", description: "提供定期的技术支持和快速的应急响应，以维持您物流生产力的稳定性。" }
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