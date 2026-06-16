"use client"

import { useState, useEffect } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { BadgeDollarSign, Users, Truck, ShieldCheck, Wrench, Settings2, HelpCircle } from "lucide-react"

const HARDCODED_ADVANTAGES_ICONS = [
  BadgeDollarSign, // Index 0
  Users,           // Index 1
  Truck,           // Index 2
  ShieldCheck,     // Index 3
  Wrench,          // Index 4
  Settings2,       // Index 5
]

// Data Statis Lokal Keunggulan (ID & EN)
const CONTENT_DICTIONARY: Record<string, { badge: string; title: string; subtitle: string; advantages: any[] }> = {
  id: {
    badge: "KEUNGGULAN KAMI",
    title: "Mengapa Memilih Keylock ID?",
    subtitle: "Kami memberikan layanan terintegrasi dan berkomitmen penuh untuk menjaga efisiensi serta keamanan aset logistik Anda.",
    advantages: [
      { id: 1, title: "Efisiensi Biaya", description: "Menawarkan solusi penguncian dan keamanan logistik kompetitif dengan ROI jangka panjang yang tinggi." },
      { id: 2, title: "Tim Profesional", description: "Didukung oleh tenaga ahli dan teknisi berpengalaman yang siap menangani kebutuhan industri Anda." },
      { id: 3, title: "Pengiriman Cepat", description: "Ketepatan waktu distribusi armada armada logistik demi kelancaran operasional rantai pasok." },
      { id: 4, title: "Jaminan Keamanan", description: "Sistem pengamanan material tangguh yang memenuhi standar proteksi industri internasional." },
      { id: 5, title: "Layanan Teknis", description: "Dukungan penuh proses instalasi, komisioning sistem, hingga troubleshoot berkala di lapangan." },
      { id: 6, title: "Kustomisasi Penuh", description: "Fleksibilitas penyesuaian spesifikasi produk yang adaptif mengikuti kebutuhan unik gudang Anda." }
    ]
  },
  en: {
    badge: "OUR ADVANTAGES",
    title: "Why Choose Keylock ID?",
    subtitle: "We provide integrated services and are fully committed to maintaining the efficiency and security of your logistics assets.",
    advantages: [
      { id: 1, title: "Cost Efficiency", description: "Offering competitive locking and logistics security solutions with a high long-term ROI." },
      { id: 2, title: "Professional Team", description: "Supported by experts and experienced technicians ready to handle your industrial needs." },
      { id: 3, title: "Fast Delivery", description: "On-time distribution of logistics fleets for smooth supply chain operations." },
      { id: 4, title: "Security Guarantee", description: "Robust material protection systems that meet international industrial protection standards." },
      { id: 5, title: "Technical Support", description: "Full support for installation, system commissioning, to periodic troubleshooting in the field." },
      { id: 6, title: "Full Customization", description: "Flexible product specification adjustments adaptive to the unique needs of your warehouse." }
    ]
  },
  "zh-Hans": {
    badge: "我们的优势",
    title: "为什么选择 Keylock ID？",
    subtitle: "我们提供一体化服务，全心致力于保障您物流资产的高效与安全。",
    advantages: [
      { id: 1, title: "成本效益", description: "提供具有竞争力的锁具与物流安全解决方案，带来高额的长期投资回报。" },
      { id: 2, title: "专业团队", description: "拥有经验丰富的专家和技术人员，随时满足您的工业级定制化需求。" },
      { id: 3, title: "快速交付", description: "准时高效配送物流车队，全面确保整个工业供应链的顺畅运转。" },
      { id: 4, title: "安全保障", description: "坚固耐用的物料防护保护系统，符合严格的国际工业安全防护标准。" },
      { id: 5, title: "技术支持", description: "全程提供现场高标准安装、系统调试指导以及定期的故障排查服务。" },
      { id: 6, title: "全面定制", description: "极具灵活性的产品规格调整，精准适配您仓库或工厂的独特作业需求。" }
    ]
  }
}

interface WhyChooseUsProps {
  locale?: string;
}

export function WhyChooseUs({ locale = "id" }: WhyChooseUsProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"];

  if (!isMounted) {
    return <section id="why" className="relative overflow-hidden bg-navy py-24" />
  }

  return (
    <section id="why" className="relative overflow-hidden bg-navy py-24">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(90,140,220,0.25), transparent 40%), radial-gradient(circle at 85% 80%, rgba(242,183,5,0.12), transparent 45%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeading
          light
          eyebrow={currentContent.badge}
          title={currentContent.title}
          subtitle={currentContent.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {currentContent.advantages.map((r, i) => {
            const IconComponent = HARDCODED_ADVANTAGES_ICONS[i] || HelpCircle;

            return (
              <Reveal key={r.id} delay={i * 0.07}>
                <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/50">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400 text-navy transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{r.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  )
}