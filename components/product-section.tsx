"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL

interface StrapiImage {
  id: number
  url: string
  alternativeText?: string | null
}

interface CategoryComponentData {
  id: number
  name: string
  slug: string
  description?: string
  image?: StrapiImage 
}

interface ProductSectionProps {
  data?: {
    badge?: string
    title?: string
    description?: string
    categories?: CategoryComponentData[]
  }
  locale?: string
}

export function ProductSection({ data, locale = "id" }: ProductSectionProps) {
  const sliderRef = useRef<HTMLDivElement>(null)

  if (!data) return null
  const displayCategories = data.categories || []

  // Fungsi navigasi tombol slide
  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2
      sliderRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <section id="products" className="relative bg-slate-50 py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Utama dengan Tombol Navigasi Slide */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <SectionHeading
              eyebrow={data.badge || "Kategori Produk"}
              title={data.title || "Solusi Industrial Terintegrasi"}
              subtitle={data.description || "Pilih kategori segmen produk untuk melihat katalog spesifikasi."}
            />
          </div>
          
          {/* Tombol Navigasi Slider */}
          {displayCategories.length > 3 && (
            <div className="mt-6 flex gap-2 md:mt-0">
              <button
                onClick={() => scroll("left")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-amber-400 hover:text-[#0c1a30] hover:border-amber-400"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-amber-400 hover:text-[#0c1a30] hover:border-amber-400"
                aria-label="Next Slide"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        {/* Container Slide Memanjang (Horizontal Slider) */}
        <div
          ref={sliderRef}
          className="no-scrollbar mt-14 flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none" }}
        >
          {displayCategories.map((cat, i) => {
            const targetHref = `/${locale}/products/${cat.slug}`
            
            // Perbaikan mapping URL Single Media Strapi
            const rawUrl = cat.image?.url
            const categoryImg = rawUrl 
              ? (rawUrl.startsWith("http") ? rawUrl : `${strapiBaseUrl}${rawUrl}`)
              : "/images/category_placeholder.png"

            return (
              <div 
                key={cat.id || cat.slug} 
                className="w-[85vw] sm:w-[45vw] lg:w-[31%] flex-shrink-0 snap-start"
              >
                <Reveal delay={i * 0.05}>
                  <Link 
                    href={targetHref}
                    className="group flex flex-col justify-between h-[420px] overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-amber-300"
                  >
                    <div>
                      {/* Wadah Gambar Kategori */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={categoryImg}
                          alt={cat.name}
                          fill
                          sizes="(max-w-7xl) 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          unoptimized
                        />
                      </div>

                      {/* Judul Kategori */}
                      <h3 className="mt-5 font-heading text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                        {cat.name}
                      </h3>
                      
                      {/* Deskripsi Kategori */}
                      <p className="mt-2 text-sm leading-relaxed text-slate-500 line-clamp-3">
                        {cat.description || "Jelajahi spesifikasi dan katalog produk industrial terbaik kami."}
                      </p>
                    </div>

                    {/* Tautan Aksi */}
                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-700">
                      <span>Jelajahi Produk</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}