"use client"

import Image from "next/image"
import { CheckCircle2, Building2, Trophy, Users } from "lucide-react"

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>
  value: string
  label: string
}

function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="text-amber-500">
        <Icon className="size-5" />
      </div>
      <div>
        <div className="font-heading text-2xl font-bold text-slate-900">{value}</div>
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-0.5">{label}</div>
      </div>
    </div>
  )
}

interface CompanyOverviewProps {
  data?: {
    id?: number
    documentId?: string
    badge?: string
    title?: string
    description_1?: string
    description_2?: string
    image_url?: string
    
    // Statistik dari JSON
    stats_units_value?: string
    stats_units_label?: string
    stats_cities_value?: string
    stats_cities_label?: string
    stats_clients_value?: string
    stats_clients_label?: string
    
    // Visi Misi dari JSON
    vision_eyebrow?: string
    vision_title?: string
    vision_text?: string
    
    mission_eyebrow?: string
    mission_title?: string
    mission_list?: Array<{ id: number; text: string }>
  }
}

export function CompanyOverview({ data }: CompanyOverviewProps) {
  const overviewData = data

  if (!overviewData) return null

  const rawMissions = overviewData.mission_list || []
  const formattedMissions = rawMissions
    .map((item: any) => (typeof item === "string" ? item : item?.text || ""))
    .filter(Boolean)

  const displayImage = overviewData.image_url || "/images/about_isometric.png"

  return (
    <div className="w-full bg-white antialiased">
      
      {/* SECTION ATAS: Ringkasan Profil & Ilustrasi */}
      <section className="relative overflow-hidden bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Sisi Kiri: Gambar Representasi Isometrik */}
            <div className="relative overflow-hidden rounded-2xl lg:col-span-5">
              <div className="aspect-square w-full relative bg-slate-50 border border-slate-100 rounded-2xl">
                <Image
                  src={displayImage}
                  alt={overviewData.title || "Keylock ID Overview"}
                  fill
                  className="object-cover object-center rounded-2xl"
                  priority
                />
              </div>
            </div>

            {/* Sisi Kanan: Teks Utama & Statistik Kontras */}
            <div className="lg:col-span-7">
              {overviewData.badge && (
                <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                  {overviewData.badge}
                </span>
              )}
              {overviewData.title && (
                <h1 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  {overviewData.title}
                </h1>
              )}
              <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                {overviewData.description_1 && <p>{overviewData.description_1}</p>}
                {overviewData.description_2 && <p>{overviewData.description_2}</p>}
              </div>

              {/* Grid Statistik */}
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {overviewData.stats_units_value && (
                  <StatCard 
                    icon={Building2} 
                    value={overviewData.stats_units_value} 
                    label={overviewData.stats_units_label || "TOTAL UNIT ALAT"} 
                  />
                )}
                {overviewData.stats_cities_value && (
                  <StatCard 
                    icon={Trophy} 
                    value={overviewData.stats_cities_value} 
                    label={overviewData.stats_cities_label || "PROYEK SELESAI"} 
                  />
                )}
                {overviewData.stats_clients_value && (
                  <StatCard 
                    icon={Users} 
                    value={overviewData.stats_clients_value} 
                    label={overviewData.stats_clients_label || "KLIEN MITRA"} 
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION BAWAH: Visi & Misi dengan Latar Paralaks Gambar about_vm.png */}
      <section 
        className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center overflow-hidden select-none"
        style={{ backgroundImage: "url('/images/about_vm.png')" }}
      >
        {/* OVERLAY GELAP */}
        <div className="absolute inset-0 bg-[#0a1424]/85 pointer-events-none -z-0" />
        
        {/* Dekorasi lingkaran cahaya */}
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[80px] pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 items-stretch">
            
            {/* Kartu Visi */}
            {overviewData.vision_text && (
              <div className="flex flex-col justify-between rounded-2xl bg-[#070f1e]/85 p-8 border border-white/10 backdrop-blur-sm shadow-xl lg:p-12">
                <div>
                  {overviewData.vision_eyebrow && (
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                      {overviewData.vision_eyebrow}
                    </span>
                  )}
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {overviewData.vision_title || "Visi Kami"}
                  </h3>
                  <p className="mt-6 text-base leading-relaxed text-slate-300 sm:text-lg">
                    {overviewData.vision_text}
                  </p>
                </div>
              </div>
            )}

            {/* Kartu Misi */}
            {formattedMissions.length > 0 && (
              <div className="flex flex-col justify-between rounded-2xl bg-white p-8 border border-slate-100 shadow-2xl lg:p-12">
                <div>
                  {overviewData.mission_eyebrow && (
                    <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                      {overviewData.mission_eyebrow}
                    </span>
                  )}
                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    {overviewData.mission_title || "Misi Kami"}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {formattedMissions.map((mission: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3.5 text-sm leading-relaxed text-slate-600 sm:text-base">
                        <CheckCircle2 className="size-5 shrink-0 text-amber-500 mt-0.5" />
                        <span>{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  )
}