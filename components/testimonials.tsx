"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeading } from "./reveal"

// Kamus statis hanya untuk judul dan deskripsi section berdasarkan bahasa
const CONTENT_DICTIONARY: Record<
  string,
  {
    badge: string
    title: string
    description: string
  }
> = {
  id: {
    badge: "TESTIMONI",
    title: "Apa Kata Klien Kami",
    description: "Ulasan jujur dari para mitra industri yang telah memercayakan sistem logistik dan keamanan operasional mereka kepada kami.",
  },
  en: {
    badge: "TESTIMONIALS",
    title: "What Our Clients Say",
    description: "Honest reviews from industrial partners who have entrusted their logistics and operational security systems to us.",
  },
  "zh-Hans": {
    badge: "客户见证",
    title: "客户的真实评价",
    description: "来自核心工业合作伙伴的真实反馈，他们坚信并选择了我们的物流与作业安全防护系统。",
  },
}

interface TestimonialItem {
  id: number
  name: string
  role?: string
  message: Record<string, string> | string
  rating: number
}

interface TestimonialsProps {
  locale?: string
}

export function Testimonials({ locale = "id" }: TestimonialsProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([])
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Mengambil data dari API Laravel secara dinamis seperti ProductSection
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/testimonials`,
          {
            headers: {
              "X-Locale": locale,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch testimonials")
        }

        const json = await res.json()
        // Mengambil data array dari struktur response API Laravel ({status, data})
        const data = json.data || json
        setTestimonials(data)
      } catch (error) {
        console.error("Gagal memuat testimoni:", error)
      }
    }

    fetchTestimonials()
  }, [locale])

  // Efek otomatis bergeser (slider timer)
  useEffect(() => {
    if (testimonials.length <= 1) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(t)
  }, [testimonials.length])

  const currentContent =
    CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY.id

  if (!isMounted) {
    return (
      <section 
        className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center overflow-hidden select-none"
        style={{ backgroundImage: "url('/images/testimoni.png')" }}
      />
    )
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
          eyebrow={currentContent.badge} 
          title={currentContent.title}
          subtitle={currentContent.description} 
        />

        {testimonials.length > 0 && (
          <div className="relative mt-12 min-h-[260px]">
            <AnimatePresence mode="wait">
              {testimonials.map((item, idx) => {
                if (idx !== index) return null;

                // Mengambil pesan multibahasa dari JSON berdasarkan locale yang aktif
                let quoteText = ""
                if (typeof item.message === "object" && item.message !== null) {
                  quoteText = item.message[locale] || item.message["id"] || Object.values(item.message)[0] || ""
                } else if (typeof item.message === "string") {
                  try {
                    const parsed = JSON.parse(item.message)
                    quoteText = parsed[locale] || parsed["id"] || ""
                  } catch {
                    quoteText = item.message
                  }
                }

                const clientName = item.name
                const clientRole = item.role
                const starRating = Number(item.rating) || 5

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
                    <p className="mt-6 text-pretty text-lg leading-relaxed text-slate-100 italic">
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
        {testimonials.length > 1 && (
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
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