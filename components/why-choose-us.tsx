"use client"

import { useState, useEffect } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { BadgeDollarSign, Users, Truck, ShieldCheck, Wrench, Settings2, HelpCircle } from "lucide-react"
import { AdvantagesSectionData } from "../src/types/homepage"

// 🔥 SOLUSI 1: Hardcode urutan icon sesuai urutan keunggulan di grid (0 sampai 5)
const HARDCODED_ADVANTAGES_ICONS = [
  BadgeDollarSign, // Kotak 1 (index 0)
  Users,           // Kotak 2 (index 1)
  Truck,           // Kotak 3 (index 2)
  ShieldCheck,     // Kotak 4 (index 3)
  Wrench,          // Kotak 5 (index 4)
  Settings2,       // Kotak 6 (index 5)
]

interface WhyChooseUsProps {
  data: AdvantagesSectionData;
}

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  // 🔥 SOLUSI 2: Matikan render server jika terganggu ekstensi / auto-translate browser
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null;

  // Render section kosong sementara waktu saat SSR (Server-Side) berlangsung
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
          eyebrow={data.badge}
          title={data.title}
          subtitle={data.subtitle}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.advantages?.map((r, i) => {
            // 🔥 Otomatis ambil komponen icon berdasarkan urutan loop index (i)
            const IconComponent = HARDCODED_ADVANTAGES_ICONS[i] || HelpCircle;

            // 🔥 JAGA-JAGA: Toleransi jika nama field deskripsi tertukar antara 'desc' atau 'description'
            // @ts-ignore
            const descriptionText = r.desc || r.description || "";

            return (
              <Reveal key={r.id} delay={i * 0.07}>
                <div className="glass group h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-400/50">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400 text-navy transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-white">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{descriptionText}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  )
}