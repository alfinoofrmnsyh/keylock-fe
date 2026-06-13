"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeading } from "./reveal"

interface TestimonialsProps {
  data: any;
}

export function Testimonials({ data }: TestimonialsProps) {
  const [index, setIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Ambil list review dengan toleransi penamaan array plural di Strapi
  const listReviews = data?.testimonials || data?.items || data?.reviews || []

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (listReviews.length <= 1) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % listReviews.length)
    }, 5000)
    return () => clearInterval(t)
  }, [listReviews.length])

  if (!data) return null

  // Cegah error Hydration mismatch akibat inisialisasi interval di client side
  if (!isMounted) {
    return <section className="relative overflow-hidden bg-navy py-24" />
  }

  return (
     <section 
        className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center overflow-hidden select-none"
        style={{ backgroundImage: "url('/images/testimoni.png')" }}
      >
        {/* OVERLAY GELAP */}
        <div className="absolute inset-0 bg-[#0a1424]/85 pointer-events-none -z-0" />
        
        {/* Dekorasi lingkaran cahaya */}
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading 
          light 
          eyebrow={data.badge || data.eyebrow || "Testimoni"} 
          title={data.title}
          subtitle={data.description || data.subtitle} 
        />

        {listReviews.length > 0 && (
          <div className="relative mt-12 min-h-[260px]">
            <AnimatePresence mode="wait">
              {listReviews.map((item: any, idx: number) => {
                if (idx !== index) return null;

                // Toleransi penamaan kolom review/testimoni dari Strapi
                const clientName = item.name
                const clientRole = item.role_company
                const quoteText = item.quote
                const starRating = Number(item.rating)

                return (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="glass mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-10"
                  >
                    {/* Render Bintang */}
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: starRating }).map((_, i) => (
                        <Star key={i} className="size-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    
                    {/* Teks Quote */}
                    <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-100">
                      &ldquo;{quoteText}&rdquo;
                    </p>
                    
                    {/* Informasi Klien */}
                    <div className="mt-6">
                      <div className="font-heading text-base font-semibold text-white">
                        {clientName}{clientRole ? `, ${clientRole}` : ""}
                      </div>
                    
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}

        {/* Indikator Dots Slider */}
        {listReviews.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {listReviews.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-amber-400" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}