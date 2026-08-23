"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Reveal, SectionHeading } from "@/components/reveal"
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
    badge: "PRODUK TERPOPULER",
    title: "Trending Produk Pilihan",
    description:
      "Temukan produk unggulan dan paling banyak dicari untuk kebutuhan industrial Anda.",
  },
  en: {
    badge: "TRENDING PRODUCTS",
    title: "Featured Popular Products",
    description:
      "Discover top-performing and most sought-after products for your industrial needs.",
  },
  "zh-Hans": {
    badge: "热门产品",
    title: "精选热门产品",
    description:
      "发现满足您工业需求的顶级和最受欢迎的产品。",
  },
}

interface ProductItem {
  slug: string
  title: string | Record<string, string>
  desc?: string | Record<string, string>
  image_url?: string
  price?: string
  trending?: number
}

interface TrendingProductSectionProps {
  locale?: string
}

export function TrendingProductSection({
  locale = "id",
}: TrendingProductSectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [products, setProducts] = useState<ProductItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
          {
            headers: {
              "X-Locale": locale,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch products")
        }
        const json = await res.json()
        const rawData: ProductItem[] = Array.isArray(json) ? json : json.data || []
        const trendingOnly = rawData.filter(
         (item) => Number(item.trending) === 1
        )
        const displayProducts = trendingOnly.length > 0 ? trendingOnly : rawData.slice(0, 8)

        setProducts(displayProducts)
      } catch (error) {
        console.error("Gagal memuat produk trending:", error)
      }
    }

    fetchTrendingProducts()
  }, [locale])

  const getLocalizedText = (field?: string | Record<string, string>) => {
    if (!field) return ""
    if (typeof field === "string") return field
    return field[locale] || field["id"] || Object.values(field)[0] || ""
  }

  const handleScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft
      const itemWidth = sliderRef.current.querySelector("div")?.clientWidth || 200
      const newIndex = Math.round(scrollLeft / itemWidth)
      setActiveIndex(newIndex)
    }
  }

  const scrollToSlide = (index: number) => {
    if (sliderRef.current) {
      const itemWidth = sliderRef.current.querySelector("div")?.clientWidth || 200
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
      sliderRef.current.scrollBy({ left: -320, behavior: "smooth" })
    }
  }

  const scrollRightDesktop = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 320, behavior: "smooth" })
    }
  }

  const currentContent =
    CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY.id

  if (!isMounted || products.length === 0) {
    return null
  }

  return (
    <section
      id="trending-products"
      className="relative overflow-hidden bg-slate-50/50 py-20 border-y border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div className="flex-1">
            <SectionHeading
              eyebrow={currentContent.badge}
              title={currentContent.title}
              subtitle={currentContent.description}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollLeftDesktop}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={scrollRightDesktop}
              className="flex size-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-sm"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Slider Track - 2 Kolom di Mobile, 4 Kolom di Desktop */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product, i) => {
            const targetHref = `/${locale}/products/${product.slug}`
            const productName = getLocalizedText(product.title)
            const productDesc = getLocalizedText(product.desc)

            let imageUrl = "/images/product_placeholder.png"
            if (product.image_url) {
              if (product.image_url.startsWith("http")) {
                imageUrl = product.image_url
              } else if (product.image_url.startsWith("/")) {
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${product.image_url}`
              } else {
                imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.image_url}`
              }
            }

            return (
              <div
                key={product.slug}
                className="snap-start flex-[0_0_calc(50%-8px)] sm:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-15px)] min-w-0"
              >
                <Reveal delay={i * 0.05} className="h-full">
                  <Link
                    href={targetHref}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-3 sm:p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100 border border-slate-100">
                        <Image
                          src={imageUrl}
                          alt={productName}
                          fill
                          unoptimized
                          sizes="(max-width: 1024px) 50vw, 25vw"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>

                      {/* Title */}
                      <h3 className="mt-3 sm:mt-4 font-heading text-xs sm:text-base font-bold text-slate-900 transition-colors group-hover:text-amber-600 line-clamp-1">
                        {productName}
                      </h3>

                      {/* Description */}
                      <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {productDesc.replace(/<[^>]*>?/gm, "") ||
                          (locale === "id"
                            ? "Spesifikasi industri berkualitas tinggi dan teruji."
                            : locale === "zh-Hans"
                            ? "高质量且经过测试的工业规格。"
                            : "High quality and tested industrial specifications.")}
                      </p>
                    </div>

                    {/* Action Footer */}
                    <div className="mt-4 sm:mt-5 flex items-center justify-between border-t border-slate-100 pt-2.5 sm:pt-3 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-600">
                      <span className="whitespace-nowrap">
                        {locale === "id"
                          ? "Lihat Detail"
                          : locale === "zh-Hans"
                          ? "查看详情"
                          : "View Details"}
                      </span>
                      <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                </Reveal>
              </div>
            )
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-amber-500"
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