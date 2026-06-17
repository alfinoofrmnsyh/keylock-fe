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

export function CompanyOverview({ data }: { data: any }) {
  if (!data) return null

  let formattedMissions: string[] = []
  if (data.mission_list && typeof data.mission_list === 'object') {
    formattedMissions = Object.values(data.mission_list).map((item: any) => item.text)
  }

  const displayImage = data.image_url || "/images/about_isometric.png"

  return (
    <div className="w-full bg-white antialiased">
      
      {/* SECTION ATAS: Ringkasan Profil */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-12 lg:pb-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="relative overflow-hidden rounded-2xl lg:col-span-5">
              <div className="aspect-square w-full relative bg-slate-50 border border-slate-100 rounded-2xl">
                <Image src={displayImage} alt={data.title || "Overview"} fill className="object-cover rounded-2xl" priority />
              </div>
            </div>

            <div className="lg:col-span-7">
              {data.badge && <span className="text-xs font-bold uppercase tracking-widest text-amber-500">{data.badge}</span>}
              <h1 className="font-heading mt-3 text-3xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">{data.title}</h1>
              <div className="mt-6 space-y-4 text-slate-600 text-lg">
                {data.description_1 && <p>{data.description_1}</p>}
                {data.description_2 && <p>{data.description_2}</p>}
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {data.stats_units_value && <StatCard icon={Building2} value={data.stats_units_value} label={data.stats_units_label || "TOTAL UNIT"} />}
                {data.stats_cities_value && <StatCard icon={Trophy} value={data.stats_cities_value} label={data.stats_cities_label || "PROYEK"} />}
                {data.stats_clients_value && <StatCard icon={Users} value={data.stats_clients_value} label={data.stats_clients_label || "KLIEN"} />}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION BAWAH: Visi & Misi */}
      <section className="relative py-20 lg:py-28 bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('/images/about_vm.png')" }}>
        <div className="absolute inset-0 bg-[#0a1424]/85" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 items-stretch">
            <div className="rounded-2xl bg-[#070f1e]/85 p-8 border border-white/10 backdrop-blur-sm lg:p-12">
              <h3 className="text-2xl font-bold text-white sm:text-3xl">{data.vision_title || "Visi Kami"}</h3>
              <p className="mt-6 text-slate-300 text-lg">{data.vision_text}</p>
            </div>

            {formattedMissions.length > 0 && (
              <div className="rounded-2xl bg-white p-8 shadow-2xl lg:p-12">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">{data.mission_title || "Misi Kami"}</h3>
                <ul className="mt-6 space-y-4">
                  {formattedMissions.map((text: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-600">
                      <CheckCircle2 className="size-5 shrink-0 text-amber-500 mt-1" />
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}