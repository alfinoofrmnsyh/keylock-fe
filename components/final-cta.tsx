"use client"

import { motion } from "framer-motion"
import { Forklift, MessageCircle, ArrowRight } from "lucide-react"

interface FinalCtaProps {
  data: {
    title: string
    description: string
    primary_btn_text?: string
    primary_btn_url?: string
    whatsapp_number?: string
  }
}

export function FinalCta({ data }: FinalCtaProps) {
  if (!data) return null

  const whatsappUrl = data.whatsapp_number 
    ? `https://wa.me/${data.whatsapp_number.replace(/[^0-9]/g, "")}`
    : "https://wa.me/6281234567890"

  return (
    <section id="contact" className="relative overflow-hidden bg-navy py-28">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(90,140,220,0.3), transparent 40%), radial-gradient(circle at 80% 70%, rgba(242,183,5,0.12), transparent 45%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute bottom-10 text-white/10"
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
          {data.title}
        </motion.h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty leading-relaxed text-slate-300">
          {data.description}
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <a
            href={data.primary_btn_url || "#contact"}
            className="inline-flex h-12 items-center justify-center gap-1 rounded-lg bg-amber-400 px-7 text-sm font-semibold text-navy transition-colors hover:bg-amber-300"
          >
            {data.primary_btn_text || "Konsultasi Gratis"} <ArrowRight className="ml-1 size-4" />
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-emerald-500 px-7 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
          >
            <MessageCircle className="mr-1 size-4" /> WhatsApp Sales
          </a>
        </div>
      </div>
    </section>
  )
}