"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Reveal, SectionHeading } from "./reveal"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

const CONTENT_DICTIONARY: Record<
  string,
  {
    badge: string
    title: string
    description: string
  }
> = {
  id: {
    badge: "KATEGORI PRODUK",
    title: "Solusi Industrial Terintegrasi",
    description:
      "Pilih kategori segmen produk untuk melihat katalog spesifikasi terbaik kami.",
  },

  en: {
    badge: "PRODUCT CATEGORIES",
    title: "Integrated Industrial Solutions",
    description:
      "Select a product segment category to view our top specification catalogs.",
  },

  "zh-Hans": {
    badge: "产品类别",
    title: "一体化工业解决方案",
    description:
      "选择核心产品细分类别，即可查看我们顶级的工业规格型录。",
  },
}

interface Category {
  slug: string
  name: string
  image_url?: string
}

interface ProductSectionProps {
  locale?: string
}

export function ProductSection({
  locale = "id",
}: ProductSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            headers: {
              "X-Locale": locale,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch categories")
        }

        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error("Gagal memuat kategori:", error)
      }
    }

    fetchCategories()
  }, [locale])

  // Fungsi untuk mendeteksi indeks aktif saat slider digeser
  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft
      const itemWidth = sliderRef.current.querySelector("div")?.clientWidth || 300
      const newIndex = Math.round(scrollLeft / itemWidth)
      setActiveIndex(newIndex)
    }
  }

  // Fungsi untuk berpindah slide saat titik diklik
  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.querySelector("div")?.clientWidth || 300
      // Menambahkan gap (misal 16px) agar posisi scroll pas
      const gap = 16 
      sliderRef.current.scrollTo({
        left: index * (itemWidth + gap),
        behavior: "smooth",
      })
      setActiveIndex(index)
    }
  }

  const scrollLeftDesktop = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: "smooth" })
    }
  }

  const scrollRightDesktop = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: "smooth" })
    }
  }

  const currentContent =
    CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY.id

  if (!isMounted) {
    return (
      <section
        id="products"
        className="bg-slate-50 py-24"
      />
    )
  }

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-slate-50 py-17"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex-1">
            <SectionHeading
              eyebrow={currentContent.badge}
              title={currentContent.title}
              subtitle={currentContent.description}
            />
          </div>

          {/* Tombol Navigasi Slider untuk Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollLeftDesktop}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={scrollRightDesktop}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-100 hover:border-slate-300 shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Slider Container dengan Scroll Snap & Tanpa Scrollbar */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="mt-14 flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((cat, i) => {
            const targetHref = `/${locale}/products/${cat.slug}`

            let imageUrl = "/images/category_placeholder.png"
            if (cat.image_url) {
              if (cat.image_url.startsWith("http")) {
                imageUrl = cat.image_url
              } else if (cat.image_url.startsWith("/")) {
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${cat.image_url}`
              } else {
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage/${cat.image_url}`
              }
            }

            return (
              <div
                key={cat.slug}
                className="snap-start flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
              >
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={targetHref}
                    className="group flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-3 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-md"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={imageUrl}
                          alt={cat.name}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-3 sm:mt-5 font-heading text-sm sm:text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-600 line-clamp-2">
                        {cat.name}
                      </h3>
                    </div>

                    <div className="mt-4 sm:mt-auto flex items-center justify-between border-t border-slate-50 pt-3 sm:pt-4 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-700">
                      <span className="hidden sm:inline">
                        {locale === "id"
                          ? "Jelajahi Produk"
                          : locale === "zh-Hans"
                          ? "浏览产品"
                          : "Explore Products"}
                      </span>
                      <span className="sm:hidden">
                        {locale === "id"
                          ? "Jelajahi"
                          : locale === "zh-Hans"
                          ? "浏览"
                          : "Explore"}
                      </span>

                      <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              </div>
            )
          })}
        </div>

        {/* Indikator Titik (Pagination Dots) yang Modern */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {categories.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-amber-600"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}