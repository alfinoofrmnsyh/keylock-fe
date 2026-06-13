"use client"

import { useEffect, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { motion } from "framer-motion"
import { SectionHeading } from "./reveal"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

interface CityItem {
  id: number
  name: string
  lng: string | number
  lat: string | number
}

interface CoverageProps {
  data: {
    badge?: string
    title: string
    description: string
    cities: CityItem[]
  }
}

export function Coverage({ data }: CoverageProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!data) return null
  if (!isMounted) return <section className="bg-background py-24" />

  const cities = data.cities || []

  return (
    <section id="coverage" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={data.badge || "Jangkauan Layanan"}
          title={data.title}
          subtitle={data.description}
        />

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
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

              {cities.map((c, i) => (
                <Marker key={c.id || i} coordinates={[Number(c.lng), Number(c.lat)]}>
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