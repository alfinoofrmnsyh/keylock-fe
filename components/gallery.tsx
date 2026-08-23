"use client"

import { useEffect, useState } from "react"
import { SectionHeading } from "./reveal"
import MagicBento from "./MagicBento"

const CONTENT_DICTIONARY: Record<
  string,
  {
    badge: string
    title: string
    description: string
  }
> = {
  id: {
    badge: "GALERI PROJEK",
    title: "Dokumentasi Operasional & Unit Unggulan",
    description: "Eksplorasi portofolio proyek pemasangan sistem rak gudang, unit forklift, dan fasilitas penanganan material industri kami.",
  },
  en: {
    badge: "PROJECT GALLERY",
    title: "Operational Documentation & Featured Units",
    description: "Explore our portfolio of warehouse racking installation projects, forklift units, and industrial material handling facilities.",
  },
  "zh-Hans": {
    badge: "项目展厅",
    title: "运营记录与核心产品展示",
    description: "探索我们的仓库货架安装项目、叉车设备以及工业物料搬运设施的综合实力。",
  },
}

interface GallerySectionProps {
  locale?: string
}

export function GallerySection({ locale = "id" }: GallerySectionProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [cards, setCards] = useState<Array<{ color: string; image?: string; label: string; title: string; description: string }>>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/galleries`,
          {
            headers: {
              "X-Locale": locale,
            },
            cache: "no-store",
          }
        )

        if (!res.ok) {
          throw new Error("Failed to fetch galleries")
        }

        const json = await res.json()
        const rawData = json.data || json

        const parseLangField = (field: any) => {
          if (!field) return ""
          if (typeof field === "object") {
            return field[locale] || field["id"] || Object.values(field)[0] || ""
          }
          if (typeof field === "string") {
            try {
              const parsed = JSON.parse(field)
              return parsed[locale] || parsed["id"] || field
            } catch {
              return field
            }
          }
          return String(field)
        }

        // Fungsi untuk menghilangkan tag HTML seperti <p>, <br>, dll dari backend
        const stripHtmlTags = (html: string) => {
          if (!html) return ""
          return html.replace(/<[^>]*>?/gm, '')
        }

        const formattedCards = rawData.map((item: any) => {
          let imageUrl = item.image || item.image_url || ""
          if (imageUrl && !imageUrl.startsWith("http")) {
            imageUrl = `${process.env.NEXT_PUBLIC_API_URL}/storage/${imageUrl}`
          }

          return {
            color: item.color || "#0d1b2a",
            image: imageUrl,
            label: parseLangField(item.label),
            title: parseLangField(item.title),
            description: stripHtmlTags(parseLangField(item.description)), // Dibersihkan dari tag <p>
          }
        })

        setCards(formattedCards)
      } catch (error) {
        console.error("Gagal memuat data galeri:", error)
      }
    }

    fetchGalleries()
  }, [locale])

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY.id

  if (!isMounted) {
    return (
      <section className="relative bg-white py-24 overflow-hidden" id="gallery" />
    )
  }

  return (
    <section className="relative bg-white py-24 overflow-hidden" id="gallery">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <SectionHeading
          eyebrow={currentContent.badge}
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        <div className="mt-12">
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={450}
            particleCount={10}
            glowColor="251, 191, 36" 
            cardData={cards}
          />
        </div>
      </div>
    </section>
  )
}