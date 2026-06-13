"use client"

import { useState, useEffect } from "react"
import { Counter } from "./counter"
import { Reveal } from "./reveal"
import { ListChecks, Boxes, Forklift, ShieldCheck, HelpCircle } from "lucide-react"
import { AboutSectionData } from "../src/types/homepage"

const HARDCODED_ICONS = [
  ListChecks,   // Kotak 1
  Boxes,        // Kotak 2
  Forklift,     // Kotak 3
  ShieldCheck,  // Kotak 4
]

interface AboutProps {
  data: AboutSectionData;
}

export function About({ data }: AboutProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null;

  if (!isMounted) {
    return <section id="about" className="relative bg-background py-24" />
  }

  return (
    <section id="about" className="relative bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          
          {/* SISI KIRI: Konten Teks */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-500">
              {data.badge}
            </span>
            <h2 className="mt-3 text-balance font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {data.title}
            </h2>
            <p className="mt-5 text-pretty leading-relaxed text-steel">
              {data.description}
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {data.bullet_points?.map((item) => (
                <li key={item.id} className="flex items-center gap-2 text-sm text-navy">
                  <span className="size-1.5 shrink-0 rounded-full bg-amber-400" />
                  {item.text}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* SISI KANAN: Grid Statis */}
          <div className="grid grid-cols-2 gap-4">
            {data.stats?.map((s, i) => {
              const IconComponent = HARDCODED_ICONS[i] || HelpCircle

              // 🔥 JAGA-JAGA: Cek apakah di Strapi namanya field 'value' atau 'number'
              // @ts-ignore
              const rawText = s.value || s.number || ""

              // 🔥 AMBIL ANGKA SAJA: Cari kumpulan angka pertama dari teks (cth: "150+" jadi "150")
              const matchNumber = String(rawText).match(/\d+/)
              const safeValue = matchNumber ? parseInt(matchNumber[0], 10) : 0

              // 🔥 AMBIL SUFFIX OTOMATIS: Jika di teks ada tanda "+" atau "%", kita jadikan suffix alternatif
             const autoSuffix = matchNumber ? rawText.slice(matchNumber[0].length) : ""
             const finalSuffix = s.suffix || autoSuffix
              return (
                <Reveal key={s.id} delay={i * 0.1}>
                  <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-300 hover:shadow-lg">
                    <IconComponent className="size-7 text-navy transition-colors group-hover:text-amber-500" />
                    <div className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-4xl">
                      {/* Nilai angka murni masuk ke Counter, karakternya masuk ke suffix */}
                      <Counter to={safeValue} suffix={finalSuffix} />
                    </div>
                    <p className="mt-1 text-sm font-medium text-steel">{s.label}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  )
}