"use client"

import { motion } from "framer-motion"
import { useState, useEffect, type ReactNode } from "react" // Tambahkan useState, useEffect

export function Reveal({
  children,
  delay = 0,
  className,
  y = 24,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const [isMounted, setIsMounted] = useState(false) // State untuk cek mounting

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Jika belum di-mount di browser, jangan tampilkan animasi framer-motion agar server & client sinkron
  if (!isMounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = "center",
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  light?: boolean
  align?: "center" | "left"
}) {
  return (
    <Reveal
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span
          suppressHydrationWarning={true} // Tambahkan ini
          className={`block mt-3 text-xs font-semibold uppercase tracking-widest ${
            light ? "text-amber-300" : "text-amber-500"
          }`}
        >
          {eyebrow}
        </span>
      )}

      <h2
        className={`mt-3 text-balance font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-pretty leading-relaxed ${
            light ? "text-slate-300" : "text-steel"
          }`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  )
}
