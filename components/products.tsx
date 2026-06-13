"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeading } from "./reveal"
import { Button } from "@/components/ui/button"

const products = [
  { 
    name: "Counterbalance Forklift", 
    tag: "Forklift", 
    img: "/products/forklift.png", 
    desc: "Kapasitas 1–10 ton (Elektrik & Diesel) untuk efisiensi bongkar muat kontainer yang tangguh." 
  },
  { 
    name: "Reach Truck", 
    tag: "Gudang", 
    img: "/products/reach-truck.png", 
    desc: "Jangkauan vertikal hingga 12m, optimal untuk manuver aman di lorong gudang sempit." 
  },
  { 
    name: "Hand Pallet Truck", 
    tag: "Handling", 
    img: "/products/hand-pallet.png", 
    desc: "Solusi ekonomis dan ergonomis untuk pemindahan cepat di area loading dock." 
  },
  { 
    name: "Plastic Pallet", 
    tag: "Palet", 
    img: "/products/plastic-pallet.png", 
    desc: "Standar higienis tinggi (Food Grade) yang kuat untuk rotasi logistik dan ekspor." 
  },
  { 
    name: "Warehouse Rack", 
    tag: "Rak Sistem", 
    img: "/products/warehouse-rack.png", 
    desc: "Sistem Selective & Heavy-Duty terukur untuk memaksimalkan kapasitas ruang vertikal." 
  },
]

function TiltCard({ p }: { p: (typeof products)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [style, setStyle] = useState({})

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    setStyle({ transform: `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)` })
  }
  const reset = () => setStyle({ transform: "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)" })

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ ...style, transition: "transform 0.2s ease-out" }}
      className="group relative w-72 shrink-0 snap-center overflow-hidden rounded-2xl border border-border bg-card shadow-md sm:w-80"
    >
      <div className="relative h-56 overflow-hidden bg-secondary">
        <Image
          src={p.img || "/placeholder.svg"}
          alt={p.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          sizes="320px"
        />
        <span className="absolute left-4 top-4 rounded-full bg-navy px-3 py-1 text-xs font-medium text-white">
          {p.tag}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg font-bold text-navy">{p.name}</h3>
        <p className="mt-1 text-sm text-steel">{p.desc}</p>
      </div>
    </div>
  )
}

export function Products() {
  const scroller = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 340, behavior: "smooth" })
  }

  return (
    <section id="products" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Produk Unggulan"
            title="Armada & Peralatan Siap Kerja"
            subtitle="Jelajahi pilihan material handling terbaik yang paling sering diandalkan untuk mempercepat arus logistik industri."
          />
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => scroll(-1)} aria-label="Previous">
              <ChevronLeft className="size-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => scroll(1)} aria-label="Next">
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div
          ref={scroller}
          className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((p) => (
            <TiltCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}