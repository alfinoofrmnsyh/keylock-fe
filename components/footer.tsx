"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Truck, MapPin, Phone, Mail, MessageCircle, Globe, Send, Share2 } from "lucide-react"

// Teks navigasi lokal (Hanya untuk Layanan & Produk sesuai permintaan)
// Catatan: Target anchor disesuaikan ke id spesifiknya (#services & #products) agar scroll mendarat tepat sasaran
const TRANSLATED_NAVIGATION = {
  id: [
    {
      title: "Layanan",
      links: [
        { label: "Jual Forklift", url: "#services" },
        { label: "Sewa Forklift", url: "#services" },
        { label: "Rak Gudang Racking", url: "#services" },
        { label: "Material Handling", url: "#services" },
      ],
    },
    {
      title: "Produk",
      links: [
        { label: "Electric Forklift", url: "#products" },
        { label: "Reach Truck", url: "#products" },
        { label: "Hand Pallet", url: "#products" },
        { label: "Pallet Plastik", url: "#products" },
        { label: "Warehouse Rack", url: "#products" },
      ],
    },
  ],
  en: [
    {
      title: "Services",
      links: [
        { label: "Forklift Sales", url: "#services" },
        { label: "Forklift Rental", url: "#services" },
        { label: "Warehouse Racking", url: "#services" },
        { label: "Material Handling", url: "#services" },
      ],
    },
    {
      title: "Products",
      links: [
        { label: "Electric Forklift", url: "#products" },
        { label: "Reach Truck", url: "#products" },
        { label: "Hand Pallet", url: "#products" },
        { label: "Plastic Pallet", url: "#products" },
        { label: "Warehouse Rack", url: "#products" },
      ],
    },
  ],
  zh: [
    {
      title: "核心服务",
      links: [
        { label: "叉车销售", url: "#services" },
        { label: "叉车租赁", url: "#services" },
        { label: "仓储货架系统", url: "#services" },
        { label: "物料搬运设备", url: "#services" },
      ],
    },
    {
      title: "主要产品",
      links: [
        { label: "电动叉车", url: "#products" },
        { label: "前移式叉车", url: "#products" },
        { label: "手动搬运车", url: "#products" },
        { label: "塑料托盘", url: "#products" },
        { label: "重型仓储货架", url: "#products" },
      ],
    },
  ],
}

interface FooterProps {
  data?: {
    description?: string
    address?: string
    phone?: string
    email?: string
    whatsapp_number?: string
    whatsapp_label?: string
    google_maps_url?: string
    copyright_text?: string
    keywords_text?: string
  }
  locale?: string
}

export function Footer({ data, locale = "id" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const activeLocale = locale.startsWith("zh") ? "zh" : locale.startsWith("en") ? "en" : "id"

  // Logika mendeteksi apakah pengguna saat ini sedang berada di halaman Beranda/Homepage
  const isAtHomepage = pathname === `/${locale}` || pathname === `/${locale}/`

  // Ambil data menu berdasarkan bahasa hasil normalisasi
  const navigationColumns = TRANSLATED_NAVIGATION[activeLocale as keyof typeof TRANSLATED_NAVIGATION] || TRANSLATED_NAVIGATION.id

  // Label judul kontak dinamis berdasarkan bahasa aktif
  const contactTitle = activeLocale === "zh" ? "联系我们" : activeLocale === "en" ? "Contact Us" : "Kontak"

  // Bersihkan string nomor WhatsApp agar hanya tersisa angka untuk URL wa.me
  const cleanWaNumber = data?.whatsapp_number ? data.whatsapp_number.replace(/[^0-9]/g, "") : ""

  return (
    <footer className="bg-[#0a1424] text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-4">
          
          {/* Company Profile */}
          <div>
            <div className="flex items-center gap-2 text-white">
              <span className="flex size-9 items-center justify-center rounded-lg bg-amber-400 text-navy">
                <Truck className="size-5" />
              </span>
              <span className="font-heading text-lg font-bold">
                Keylock<span className="text-amber-400"> ID</span>
              </span>
            </div>
            {data?.description && (
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                {data.description}
              </p>
            )}
            <div className="mt-5 flex gap-3">
              {[Globe, Send, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-amber-400 hover:text-navy"
                  aria-label="Social link"
                >
                  <span className="sr-only">Social Link</span>
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Localized Navigation Columns with Smart Routing Integration */}
          {navigationColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => {
                  const isAnchor = link.url.startsWith("#")
                  
                  // LOGIKA SMART ROUTING:
                  // Jika berupa anchor link (#) dan user sedang berada di LUAR homepage (misal: /about),
                  // paksa rute mengarah ke halaman utama bahasa terkait terlebih dahulu (cth: /zh-Hans#services)
                  const finalHref = isAnchor && !isAtHomepage 
                    ? `/${locale}${link.url}` 
                    : link.url

                  return (
                    <li key={link.label}>
                      <Link 
                        href={finalHref} 
                        className="text-sm text-slate-400 transition-colors hover:text-amber-300"
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              {contactTitle}
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              {data?.address && (
                <li className="flex gap-2.5">
                  <MapPin className="size-4 shrink-0 text-amber-400 mt-0.5" />
                  {data.address}
                </li>
              )}
              {data?.phone && (
                <li className="flex gap-2.5">
                  <Phone className="size-4 shrink-0 text-amber-400" />
                  <a href={`tel:${data.phone}`} className="hover:text-white transition-colors">{data.phone}</a>
                </li>
              )}
              {data?.email && (
                <li className="flex gap-2.5">
                  <Mail className="size-4 shrink-0 text-amber-400" />
                  <a href={`mailto:${data.email}`} className="hover:text-white transition-colors">{data.email}</a>
                </li>
              )}
            </ul>
            
            {cleanWaNumber && (
              <a
                href={`https://wa.me/${cleanWaNumber}`}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                <MessageCircle className="size-4" /> {data?.whatsapp_label || "WhatsApp"}
              </a>
            )}
          </div>
        </div>

        {/* Google Maps View */}
        {data?.google_maps_url && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Lokasi Kantor"
              src={data.google_maps_url}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} {data?.copyright_text || "Keylock Indonesia. All Rights Reserved."}</p>
          {data?.keywords_text && <p className="text-slate-600 tracking-wide text-center sm:text-right">{data.keywords_text}</p>}
        </div>
      </div>
    </footer>
  )
}