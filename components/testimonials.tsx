"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Star } from "lucide-react"
import { SectionHeading } from "./reveal"

// Data Kamus Statis Lokal 3 Bahasa (ID, EN, ZH-HANS)
const CONTENT_DICTIONARY: Record<string, { badge: string; title: string; description: string; testimonials: any[] }> = {
  id: {
    badge: "TESTIMONI",
    title: "Apa Kata Klien Kami",
    description: "Ulasan jujur dari para mitra industri yang telah memercayakan sistem logistik dan keamanan operasional mereka kepada kami.",
    testimonials: [
      { 
        id: 13, 
        rating: 5, 
        quote: "Sistem rak gudang mereka berhasil memaksimalkan kapasitas penyimpanan kami hingga dua kali lipat. Proses survei lokasi sangat profesional, instalasinya lancar, dan tim lapangan sangat memahami standar K3 industri.", 
        name: "Alfino Firmansyah", 
        role_company: "IT Consultant" 
      },
      { 
        id: 14, 
        rating: 5, 
        quote: "Pengiriman armada forklift Keylock sangat tepat waktu, dan layanan purnajual mereka sangat luar biasa. Dukungan teknis on-call terus meningkatkan produktivitas gudang harian kami tanpa ada masalah kerusakan mesin.", 
        name: "Andi Pratama", 
        role_company: "Warehouse Manager, PT Sentosa Logistik" 
      },
      { 
        id: 15, 
        rating: 5, 
        quote: "Skema penyewaan forklift yang fleksibel telah secara signifikan meningkatkan efisiensi anggaran operasional kami, terutama selama lonjakan kargo di musim puncak. Unit selalu dalam kondisi prima, dan mekanik merespons sangat cepat setiap kali kami membutuhkan perawatan berkala.", 
        name: "Budi Santoso", 
        role_company: "Plant Manager, Bekasi Manufacturing" 
      }
    ]
  },
  en: {
    badge: "TESTIMONIALS",
    title: "What Our Clients Say",
    description: "Honest reviews from industrial partners who have entrusted their logistics and operational security systems to us.",
    testimonials: [
      { 
        id: 13, 
        rating: 5, 
        quote: "Their warehouse racking system successfully maximized our storage capacity up to twofold. The site survey process was highly professional, the installation was seamless, and the field team truly understands industrial safety and health (K3) standards.", 
        name: "Alfino Firmansyah", 
        role_company: "IT Consultant" 
      },
      { 
        id: 14, 
        rating: 5, 
        quote: "Keylock's forklift fleet delivery was exceptionally punctual, and their after-sales service is outstanding. The on-call technical support has continuously boosted our daily warehouse productivity without any machine breakdown issues.", 
        name: "Andi Pratama", 
        role_company: "Warehouse Manager, PT Sentosa Logistik" 
      },
      { 
        id: 15, 
        rating: 5, 
        quote: "The flexible forklift rental scheme has significantly improved our operational budget efficiency, especially during peak season cargo surges. The units are always in prime condition, and the mechanics respond extremely fast whenever we need periodic maintenance.", 
        name: "Budi Santoso", 
        role_company: "Plant Manager, Bekasi Manufacturing" 
      }
    ]
  },
  "zh-Hans": {
    badge: "客户见证",
    title: "客户的真实评价",
    description: "来自核心工业合作伙伴的真实反馈，他们坚信并选择了我们的物流与作业安全防护系统。",
    testimonials: [
      { 
        id: 13, 
        rating: 5, 
        quote: "他们的仓库货架系统成功将我们的储存容量提高了一倍。现场勘测流程非常专业，安装过程无缝衔接，现场团队真正精通工业安全与健康（K3）标准。", 
        name: "Alfino Firmansyah", 
        role_company: "IT Consultant" 
      },
      { 
        id: 14, 
        rating: 5, 
        quote: "Keylock 的叉车车队交付异常准时，售后服务也非常出色。全天候待命的技术支持持续提升了我们仓库的日常生产力，从未出现任何机械故障问题。", 
        name: "Andi Pratama", 
        role_company: "Warehouse Manager, PT Sentosa Logistik" 
      },
      { 
        id: 15, 
        rating: 5, 
        quote: "灵活的叉车租赁方案显著提高了我们的运营预算效率，尤其是在旺季货物激增期间。设备始终保持在最佳状态，每当我们需要定期维护时，机修师的响应速度都极快。", 
        name: "Budi Santoso", 
        role_company: "Plant Manager, Bekasi Manufacturing" 
      }
    ]
  }
}

interface TestimonialsProps {
  locale?: string;
}

export function Testimonials({ locale = "id" }: TestimonialsProps) {
  const [index, setIndex] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  // Ambil data berdasarkan locale aktif (fallback ke 'id' jika tidak ditemukan)
  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"]
  const listReviews = currentContent.testimonials

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

  // Cegah error Hydration mismatch akibat inisialisasi internal di client side
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
          eyebrow={currentContent.badge} 
          title={currentContent.title}
          subtitle={currentContent.description} 
        />

        {listReviews.length > 0 && (
          <div className="relative mt-12 min-h-[260px]">
            <AnimatePresence mode="wait">
              {listReviews.map((item: any, idx: number) => {
                if (idx !== index) return null;

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