"use client"

import { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { motion } from "framer-motion"
import { SectionHeading } from "./reveal"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

// Data Geografis Kota (Garis Bujur & Lintang)
const CITIES_DATA = [
  { id: 25, nameId: "Jakarta", nameEn: "Jakarta", nameZh: "雅加达 (Jakarta)", lng: 106.85, lat: -6.21 },
  { id: 26, nameId: "Bekasi", nameEn: "Bekasi", nameZh: "勿加泗 (Bekasi)", lng: 107.0, lat: -6.24 },
  { id: 27, nameId: "Karawang", nameEn: "Karawang", nameZh: "加拉璜 (Karawang)", lng: 107.3, lat: -6.32 },
  { id: 28, nameId: "Cikarang", nameEn: "Cikarang", nameZh: "芝加朗 (Cikarang)", lng: 107.15, lat: -6.27 },
  { id: 29, nameId: "Subang", nameEn: "Subang", nameZh: "苏邦 (Subang)", lng: 107.6, lat: -6.92 },
  { id: 30, nameId: "Surabaya", nameEn: "Surabaya", nameZh: "泗水 (Surabaya)", lng: 112.75, lat: -7.25 }
]

const CONTENT_DICTIONARY: Record<string, { badge: string; title: string; description: string; cities: any[] }> = {
  id: {
    badge: "WILAYAH CAKUPAN",
    title: "Melayani Kebutuhan Industri di Seluruh Indonesia",
    description: "Mencakup zona industri utama dan pusat logistik strategis di Indonesia, kami memastikan ketersediaan armada dan dukungan teknis terbaik langsung di lokasi bisnis Anda.",
    cities: CITIES_DATA.map(c => ({ id: c.id, name: c.nameId, lng: c.lng, lat: c.lat }))
  },
  en: {
    badge: "SERVICE COVERAGE",
    title: "Serving Industrial Needs Across Indonesia ",
    description: "Spanning across Indonesia's major industrial zones and strategic logistics hubs, we ensure top-tier fleet availability and technical support right at your business location.",
    cities: CITIES_DATA.map(c => ({ id: c.id, name: c.nameEn, lng: c.lng, lat: c.lat }))
  },
  "zh-Hans": {
    badge: "业务覆盖范围",
    title: "服务覆盖印度尼西亚的工业需求",
    description: "我们的业务遍布印度尼西亚各大工业区和战略物流枢纽，确保在您的经营所在地提供优质的车队资源和技术支持。",
    cities: CITIES_DATA.map(c => ({ id: c.id, name: c.nameZh, lng: c.lng, lat: c.lat }))
  }
}

interface CoverageProps {
  locale?: string
}

export function Coverage({ locale = "id" }: CoverageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Proteksi Hydration
  if (!isMounted) return <section className="bg-background py-24" />

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"]
  const cities = currentContent.cities

  return (
    <section id="coverage" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={currentContent.badge}
          title={currentContent.title}
          subtitle={currentContent.description}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* PETA MAPS */}
          <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary min-h-[400px] flex items-center justify-center">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 850, center: [118, -2.5] }}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies
                    .filter((g) => g.properties.name === "Indonesia")
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#1f3a63"
                        stroke="#0f2747"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#2b5293", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                }
              </Geographies>

              {/* ITERASI DOTS MARKER */}
              {cities.map((c, i) => (
                <Marker key={c.id || i} coordinates={[c.lng, c.lat]}>
                  <motion.circle
                    r={4}
                    fill="#f2b705"
                    stroke="#fff"
                    strokeWidth={1}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, type: "spring" }}
                  />
                  <circle r={4} fill="#f2b705" opacity={0.4}>
                    <animate attributeName="r" from="4" to="12" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                </Marker>
              ))}
            </ComposableMap>
          </div>

          {/* GRID CARD DAFTAR KOTA */}
          <div className="grid grid-cols-2 gap-3">
            {cities.map((c, i) => (
              <motion.div
                key={c.id || i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <span className="size-2.5 shrink-0 rounded-full bg-amber-400" />
                <span className="text-sm font-medium text-navy">{c.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}