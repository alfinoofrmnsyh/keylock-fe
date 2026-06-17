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
    title: "Mengapa Memilih Keylock Indonesia?",
    subtitle: "Kami memadukan armada logistik premium dengan layanan purnajual responsif agar rantai pasok bisnis Anda tidak pernah terganggu.",
    advantages: [
      { id: 1, title: "Efisiensi Anggaran Nyata", description: "Skema harga transparan tanpa biaya tersembunyi, membantu menekan pengeluaran CapEx untuk pengadaan peralatan Anda." },
      { id: 2, title: "Teknisi Bersertifikasi SIO", description: "Didukung oleh mekanik ahli dan operator berpengalaman yang memegang sertifikasi keselamatan kerja resmi." },
      { id: 3, title: "Mobilisasi Jaringan Luas", description: "Pengiriman unit tepat waktu dan dukungan logistik yang menjangkau seluruh wilayah operasional Anda." },
      { id: 4, title: "Unit Patuh Audit K3", description: "Seluruh armada rutin lolos inspeksi teknis yang ketat dan dilengkapi dengan dokumen SIA yang valid dan aktif." },
      { id: 5, title: "Jaminan Anti-Downtime", description: "Layanan pemeliharaan berkala terjadwal beserta jaminan unit cadangan instan jika terjadi kendala." },
      { id: 6, title: "Optimasi Ruang Terukur", description: "Rancangan teknis dan tata letak sistem racking gudang yang dihitung secara presisi untuk memaksimalkan kapasitas penyimpanan." }
    ]
  },
  en: {
    badge: "OUR ADVANTAGES",
    title: "Why Choose Keylock Indonesia?",
    subtitle: "We combine a premium logistics fleet with responsive after-sales service so that your business supply chain is never disrupted.",
    advantages: [
      { id: 1, title: "Real Budget Efficiency", description: "Transparent pricing schemes with no hidden fees, helping to slash CapEx expenditures on your equipment procurement." },
      { id: 2, title: "SIO-Certified Technicians", description: "Backed by expert mechanics and experienced operators holding official workplace safety certifications." },
      { id: 3, title: "Wide Network Mobilization", description: "On-time unit delivery and logistics support that spans across your entire operational area." },
      { id: 4, title: "K3 Audit-Compliant Units", description: "The entire fleet routinely passes strict technical inspections and is equipped with valid and active SIA documents." },
      { id: 5, title: "Anti-Downtime Guarantee", description: "Scheduled periodic maintenance services along with instant backup unit guarantees if issues arise." },
      { id: 6, title: "Measured Space Optimization", description: "Precisely calculated engineering and layout of warehouse racking systems to maximize storage capacity." }
    ]
  },
  "zh-Hans": {
    badge: "我们的优势",
    title: "为什么选择 Keylock Indonesia？",
    subtitle: "我们将优质的物流车队与快速响应的售后服务相结合，确保您的商业供应链始终顺畅，不受干扰。",
    advantages: [
      { id: 1, title: "实实在在的预算效率", description: "价格方案公开透明，绝无隐性费用，协助您大幅削减设备采购的资本支出 (CapEx)。" },
      { id: 2, title: "拥有 SIO 认证的技术人员", description: "由持有官方职业安全认证的专业机械师和经验丰富的操作人员提供技术支持。" },
      { id: 3, title: "广泛的网络调度能力", description: "准时的设备交付与物流支持，覆盖您的整个运营区域。" },
      { id: 4, title: "符合 K3 审计标准的单位", description: "整个车队定期通过严格的技术检查，并配备有效且激活的 SIA 文件。" },
      { id: 5, title: "防停机保障", description: "提供定期的预防性维护服务，并承诺在出现问题时立即提供备用设备。" },
      { id: 6, title: "精准的空间优化", description: "通过科学的工程计算和仓库货架布局设计，最大限度地提升您的仓储容量。" }
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