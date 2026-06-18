"use client"

import { motion } from "framer-motion"
import { Forklift, MessageCircle, ArrowRight } from "lucide-react"

const CONTENT_DICTIONARY: Record<string, { title: string; description: string; btnText1: string; btnText2: string; url1: string; url2: string }> = {
  id: {
    title: "Siap Meningkatkan Produktivitas Gudang Anda?",
    description: "Diskusikan kebutuhan operasional dan penanganan material Anda bersama spesialis kami sekarang. Dapatkan solusi terbaik yang dirancang khusus untuk bisnis Anda.",
    btnText1: "Konsultasi Gratis",
    btnText2: "WhatsApp Sales",
    url1: "https://wa.me/6285173013525?text=Halo%20Admin%20PT.%20Key%20Lock%20Indonesia%2C%20saya%20ingin%20konsultasi%20mengenai%20kebutuhan%20gudang.",
    url2: "https://wa.me/6289699392924?text=Halo%20Admin%20PT.%20Key%20Lock%20Indonesia%2C%20saya%20tertarik%20dengan%20produk%20Anda."
  },
  en: {
    title: "Ready to Boost Your Warehouse Productivity?",
    description: "Discuss your operational needs with our specialists today and get a material handling solution specifically tailored for your business.",
    btnText1: "Free Consultation",
    btnText2: "WhatsApp Sales",
    url1: "https://wa.me/6285173013525?text=Hello%20Admin%20PT.%20Key%20Lock%20Indonesia%2C%20I%20would%20like%20a%20free%20consultation%20regarding%20my%20warehouse.",
    url2: "https://wa.me/6289699392924?text=Hello%20Admin%20PT.%20Key%20Lock%20Indonesia%2C%20I%20am%20interested%20in%20your%20products."
  },
  "zh-Hans": {
    title: "准备好提升您的仓库生产力了吗？",
    description: "立即与 carp 我们的技术专家讨论您的工业运营需求，获取专为您的企业量身定制的高效物料搬运与仓储解决方案。",
    btnText1: "免费咨询通道",
    btnText2: "销售顾问 (WhatsApp)",
    url1: "https://wa.me/6285173013525?text=您好%20PT.%20Key%20Lock%20Indonesia%20管理员%2C%20我希望咨询关于仓库仓储设备的需求。",
    url2: "https://wa.me/6289699392924?text=您好%20PT.%20Key%20Lock%20Indonesia%20管理员%2C%20我对你们的工业重型产品非常感兴趣。"
  }
}

// 1. DEFINISIKAN LABEL KONVERSI GLOBAL DARI GOOGLE ADS
const GADS_CONVERSION_LABEL = "8m9jCPu8sEceLCd9_xD";

interface FinalCtaProps {
  locale?: string
}

export function FinalCta({ locale = "id" }: FinalCtaProps) {
  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"]

  // 2. FUNGSI UNTUK MENEMBAKKAN EVENT KONVERSI
  const trackGadsConversion = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `AW-18247175856/${GADS_CONVERSION_LABEL}`,
      });
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-28">
      {/* Efek Gradasi Latar Belakang */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(90,140,220,0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(242,183,5,0.12), transparent 45%)",
        }}
      />

      {/* Animasi Bergerak Latar Belakang Forklift */}
      <motion.div
        aria-hidden
        className="absolute bottom-10 text-white/5 pointer-events-none"
        initial={{ x: "-20%" }}
        animate={{ x: "120%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      >
        <Forklift className="size-40" />
      </motion.div>

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-balance font-heading text-3xl font-extrabold text-white sm:text-5xl"
        >
          {currentContent.title}
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-slate-300 text-sm sm:text-base">
          {currentContent.description}
        </p>
        
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          {/* 3. TOMBOL 1 (KONSULTASI GRATIS): TAMBAHKAN ONCLICK DAN UPDATE REL */}
          <a
            href={currentContent.url1}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGadsConversion}
            className="inline-flex h-12 items-center justify-center gap-1 rounded-lg bg-amber-400 px-7 text-sm font-semibold text-navy transition-colors hover:bg-amber-300"
          >
            {currentContent.btnText1} <ArrowRight className="ml-1 size-4" />
          </a>

          {/* 4. TOMBOL 2 (WHATSAPP SALES): TAMBAHKAN ONCLICK DAN UPDATE REL */}
          <a
            href={currentContent.url2}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackGadsConversion}
            className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-7 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            <MessageCircle className="mr-1 size-4" /> {currentContent.btnText2}
          </a>
        </div>
      </div>
    </section>
  )
}