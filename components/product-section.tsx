"use client"

import Link from "next/link"
import Image from "next/image"
import { useRef, useState, useEffect } from "react"
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
  const sliderRef = useRef<HTMLDivElement>(null)

  const [isMounted, setIsMounted] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])

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

  const currentContent =
    CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY.id

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2

      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      })
    }
  }

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
      className="relative overflow-hidden bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between">
          <div className="flex-1">
            <SectionHeading
              eyebrow={currentContent.badge}
              title={currentContent.title}
              subtitle={currentContent.description}
            />
          </div>

          {categories.length > 3 && (
            <div className="mt-6 flex gap-2 md:mt-0">
              <button
                onClick={() => scroll("left")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-[#0c1a30]"
              >
                <ChevronLeft className="size-5" />
              </button>

              <button
                onClick={() => scroll("right")}
                className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:border-amber-400 hover:bg-amber-400 hover:text-[#0c1a30]"
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          )}
        </div>

        <div
          ref={sliderRef}
          className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat, i) => {
            const targetHref = `/${locale}/products/${cat.slug}`

            const imageUrl = cat.image_url
              ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${cat.image_url}`
              : "/images/category_placeholder.png"

            return (
              <div
                key={cat.slug}
                className="w-[85vw] flex-shrink-0 snap-start sm:w-[45vw] lg:w-[31%]"
              >
                <Reveal delay={i * 0.05}>
                  <Link
                    href={targetHref}
                    className="group flex h-[340px] flex-col justify-between overflow-hidden rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-md"
                  >
                    <div>
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={cat.image_url || "/images/category_placeholder.png"}
                          alt={cat.name}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      <h3 className="mt-5 font-heading text-lg font-bold text-slate-900 transition-colors group-hover:text-amber-600">
                        {cat.name}
                      </h3>
                    </div>

                    <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-4 text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-700">
                      <span>
                        {locale === "id"
                          ? "Jelajahi Produk"
                          : locale === "zh-Hans"
                          ? "浏览产品"
                          : "Explore Products"}
                      </span>

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