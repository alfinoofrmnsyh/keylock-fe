"use client"

import { useState, useEffect } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { Forklift, CalendarClock, LayoutGrid, Container, HelpCircle } from "lucide-react"
import { ServicesSectionData } from "../src/types/homepage"

// 🔥 SOLUSI 1: Hardcode urutan icon sesuai desain grid layanan kamu (0 sampai 3)
const HARDCODED_SERVICES_ICONS = [
  Forklift,       // Layanan 1 (index 0)
  CalendarClock,  // Layanan 2 (index 1)
  LayoutGrid,     // Layanan 3 (index 2)
  Container,      // Layanan 4 (index 3)
]

interface ServicesProps {
  data: ServicesSectionData;
}

export function Services({ data }: ServicesProps) {
  // 🔥 SOLUSI 2: Matikan render server jika terganggu ekstensi / auto-translate browser
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null;

  // Render section kosong sementara saat proses SSR (Server-Side Rendering)
  if (!isMounted) {
    return <section id="services" className="relative bg-secondary py-24" />
  }

  return (
    <section id="services" className="relative bg-secondary py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.services?.map((s, i) => {
            // 🔥 Otomatis ambil komponen icon berdasarkan urutan loop index (i)
            const IconComponent = HARDCODED_SERVICES_ICONS[i] || HelpCircle;

            // 🔥 JAGA-JAGA: Toleransi jika field nama deskripsi/fitur tertukar di Strapi
            // @ts-ignore
            const descriptionText = s.desc || s.description || "";
            // @ts-ignore
            const featureNameText = (feat: any) => feat.name || feat.text || "";

            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-amber-400 hover:shadow-xl">
                  <div className="absolute inset-0 -z-10 bg-gradient-to-br from-amber-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <div className="flex size-12 items-center justify-center rounded-xl bg-navy text-amber-400 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <IconComponent className="size-6" />
                  </div>
                  
                  <h3 className="mt-5 font-heading text-lg font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{descriptionText}</p>
                  
                  <ul className="mt-4 space-y-2">
                    {s.features?.map((feat) => (
                      <li key={feat.id} className="flex items-center gap-2 text-sm text-navy">
                        <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                        {featureNameText(feat)}
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