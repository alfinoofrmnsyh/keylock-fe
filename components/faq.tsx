"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import { SectionHeading } from "./reveal"

const CONTENT_DICTIONARY: Record<string, { badge: string; title: string; description: string; faqs: any[] }> = {
  id: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    description: "Temukan jawaban cepat mengenai komitmen layanan kami, durasi sewa, cakupan distribusi, dan sistem pemeliharaan armada Keylock ID.",
    faqs: [
      { id: 21, question: "Berapa harga sewa forklift?", answer: "Harga sewa forklift bervariasi tergantung pada kapasitas, tipe (elektrik/diesel), dan durasi sewa (harian, mingguan, bulanan, atau kontrak jangka panjang). Hubungi tim kami untuk mendapatkan penawaran terbaik yang disesuaikan dengan kebutuhan industri Anda." },
      { id: 22, question: "Wilayah layanan mana saja yang Anda cakup?", answer: "Kami melayani berbagai kawasan industri utama di seluruh Indonesia, termasuk Jakarta, Bekasi, Cikarang, Karawang, Subang, dan Surabaya." },
      { id: 23, question: "Jenis forklift apa saja yang tersedia?", answer: "Kami menyediakan unit heavy-duty yang lengkap, termasuk Forklift Elektrik, Forklift Diesel, Reach Truck, hingga Hand Pallet Truck yang tersedia dalam berbagai macam kapasitas tonase." },
      { id: 24, question: "Berapa lama waktu pengiriman unit ke lokasi?", answer: "Pengiriman unit sangat tepat waktu dan dijadwalkan secara ketat berdasarkan kesepakatan. Untuk unit standar yang siap pakai (ready-stock), proses mobilisasi ke lokasi dapat diselesaikan dengan sangat cepat." },
      { id: 25, question: "Apakah kontrak sewa sudah termasuk biaya perawatan?", answer: "Ya, semua kontrak sewa kami sudah mencakup perawatan berkala terjadwal secara berkala serta jaminan dukungan teknis 24/7, termasuk penyediaan unit cadangan instan jika terjadi kendala operasional di lapangan." }
    ]
  },
  en: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    description: "Find quick answers regarding our service commitments, rental durations, distribution coverage, and Keylock ID's fleet maintenance system.",
    faqs: [
      { id: 21, question: "How much is the forklift rental price?", answer: "Forklift rental prices vary depending on capacity, type (electric/diesel), and rental duration (daily, weekly, monthly, or long-term contract). Contact our team for the best quotation tailored to your needs." },
      { id: 22, question: "Which service areas do you cover?", answer: "We serve major industrial areas across Indonesia, including Jakarta, Bekasi, Cikarang, Karawang, Subang, and Surabaya." },
      { id: 23, question: "What types of forklifts are available?", answer: "We provide a complete range of units, including Electric Forklifts, Diesel Forklifts, Reach Trucks, and Hand Pallet Trucks, available in various capacities." },
      { id: 24, question: "How long does unit delivery take?", answer: "Unit delivery is highly punctual and scheduled based on agreement. For standard ready-stock units, mobilization to the site can be completed quickly." },
      { id: 25, question: "Is maintenance service included?", answer: "Yes, all our rental contracts include scheduled periodic maintenance and a 24/7 technical support guarantee, including an instant backup unit if technical issues arise." }
    ]
  },
  "zh-Hans": {
    badge: "常见问题",
    title: "常见问题解答 (FAQ)",
    description: "快速了解关于我们的核心服务承诺、设备租赁期限、物流覆盖范围以及 Keylock ID 完善的车队技术维保体系。",
    faqs: [
      { id: 21, question: "叉车租赁的价格是多少？", answer: "叉车租赁费用因设备额定载重、动力类型（电动/柴油）以及具体租赁周期（日租、周租、月租或长期合同）而异。欢迎联系我们的顾问团队，获取专属的定制化高性价比报价单。" },
      { id: 22, question: "你们的服务主要覆盖哪些工业区域？", answer: "我们全面辐射印度尼西亚境内的核心主要工业园区，其中包括雅加达、勿加泗、芝加朗、加拉璜、苏邦以及泗水等地区。" },
      { id: 23, question: "目前有哪些重型叉车机型可供租赁？", answer: "我们拥有完善的工业仓储设备机群，包括全电动叉车、内燃柴油叉车、前移式高位堆高车（Reach Trucks）以及手动托盘搬运车，具备多种吨位规格满足多场景作业需求。" },
      { id: 24, question: "从下单到设备实际交付上门需要多长时间？", answer: "设备的运输和交付高度准时，完全严格遵循合同拟定计划执行。对于常规标准现货机型，可在短时间内快速完成现场动员与高效清运调拨。" },
      { id: 25, question: "租赁合同中是否已经包含日常的技术维护与保养服务？", answer: "是的，我们所有的租赁合同均已全额包含定期的例行预防性专业日常技术维护，并为您提供 24/7 全天候紧急技术响应保障，若现场突发故障更可调配同级别备用机型替代作业。" }
    ]
  }
}

interface FaqProps {
  locale?: string
}

function AccordionItem({ q, a, open, onClick }: { q: string; a: string; open: boolean; onClick: () => void }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-heading text-base font-semibold text-navy">{q}</span>
        <Plus
          className={`size-5 shrink-0 text-amber-500 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-steel">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Faq({ locale = "id" }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"]
  const items = currentContent.faqs

  return (
    <section id="faq" className="bg-secondary py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading 
          eyebrow={currentContent.badge} 
          title={currentContent.title} 
          subtitle={currentContent.description}
        />
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, i) => (
            <AccordionItem
              key={item.id || i}
              q={item.question}
              a={item.answer}
              open={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}