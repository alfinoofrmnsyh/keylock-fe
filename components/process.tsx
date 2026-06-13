"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SectionHeading } from "./reveal"
import { MessageSquare, MapPinned, PencilRuler, Wrench, LifeBuoy, HelpCircle } from "lucide-react"

// 🔥 SOLUSI 1: Hardcode urutan icon proses agar berbaris rapi dari langkah 1 sampai 5
const HARDCODED_PROCESS_ICONS = [
  MessageSquare, // Langkah 1: Konsultasi Kebutuhan
  MapPinned,     // Langkah 2: Survei Lokasi Gratis
  PencilRuler,   // Langkah 3: Rekomendasi Solusi
  Wrench,        // Langkah 4: Instalasi & Uji Layak
  LifeBuoy,      // Langkah 5: Jaminan Pemeliharaan
]

interface ProcessProps {
  // Menggunakan 'any' atau silakan ganti ke interface khusus jika sudah didaftarkan di types
  data: any; 
}

export function Process({ data }: ProcessProps) {
  // 🔥 SOLUSI 2: Proteksi Hydration Mismatch dari manipulasi browser / framer-motion
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null;

  if (!isMounted) {
    return <section className="bg-secondary py-24" />
  }

  // 🔥 JAGA-JAGA: Toleransi jika nama field array komponen di Strapi berupa 'steps' atau 'processes'
  const executionSteps = data.steps || data.processes || data.items || [];

  return (
    <section className="bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          // 🔥 Konsisten menggunakan data.badge sesuai nama field di Strapi kamu
          eyebrow={data.badge || data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-16 grid gap-8 md:grid-cols-5">
          {executionSteps.map((s: any, i: number) => {
            // 🔥 Otomatis ambil icon berdasarkan urutan loop index (i)
            const IconComponent = HARDCODED_PROCESS_ICONS[i] || HelpCircle;
            
            // 🔥 Toleransi field deskripsi jika tertukar antara 'desc' atau 'description'
            const descriptionText = s.desc || s.description || "";

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
                {i < executionSteps.length - 1 && (
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
                  <p className="mt-1 text-sm leading-relaxed text-steel">{descriptionText}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  )
}