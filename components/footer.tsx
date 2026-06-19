"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Truck, MapPin, Phone, Mail, MessageCircle, Globe, Send, Share2 } from "lucide-react"
import Image from "next/image"

const COMMON_CONFIG = {
  address: "Jl. Arteri KIIC Rolling Hills Ruko Pacifik Plaza No. 91, Margakaya, Kec. Telukjambe Barat, Karawang, Jawa Barat 41361",
  phone: "+62 812 3456 7890",
  email: "info@keylockindonesia.com",
  whatsapp_number: "6285173013525",
  google_maps_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.3055732178386!2d107.264135374785!3d-6.354474862166041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699d800f0c8e61%3A0x6bf0f30e04f4ef5e!2sPT%20KEY%20LOCK%20INDONESIA!5e0!3m2!1sid!2sid!4v1781268373774!5m2!1sid!2sid"
}

const CONTENT_DICTIONARY: Record<string, { description: string; contactTitle: string; waLabel: string; copyright: string; keywords: string; navigation: any[] }> = {
  id: {
    description: "Solusi Logistik Terpadu: Penyedia terpercaya untuk penjualan & sewa forklift, sistem rak gudang (racking), palet plastik, serta peralatan material handling premium di Indonesia.",
    contactTitle: "Kontak Kami",
    waLabel: "Hubungi via WhatsApp",
    copyright: "Keylock Indonesia. Hak Cipta Dilindungi.",
    keywords: "Karawang Forklift · Bekasi Forklift Rental · Warehouse Racking · Plastic Pallet",
    navigation: [
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
    ]
  },
  en: {
    description: "Integrated Logistics Solutions: A trusted industrial provider for forklift sales & rentals, high-density warehouse racking systems, plastic pallets, and premium material handling equipment in Indonesia.",
    contactTitle: "Contact Us",
    waLabel: "Chat via WhatsApp",
    copyright: "Keylock Indonesia. All Rights Reserved.",
    keywords: "Karawang Forklift · Bekasi Forklift Rental · Warehouse Racking · Plastic Pallet",
    navigation: [
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
    ]
  },
  "zh-Hans": {
    description: "一体化物流仓储解决方案：印度尼西亚备受 square 信赖的重型叉车销售与租赁、高密度仓储货架系统、塑料托盘及高端工业物料搬运设备一站式供应商。",
    contactTitle: "联系我们",
    waLabel: "通过 WhatsApp 在线咨询",
    copyright: "Keylock Indonesia. 保留所有权利。",
    keywords: "印尼叉车租赁 · 仓储货架系统 · 塑料托盘制造 · 物料搬运设备",
    navigation: [
      {
        title: "核心服务",
        links: [
          { label: "叉车销售业务", url: "#services" },
          { label: "叉车短期租赁", url: "#services" },
          { label: "重型仓储货架", url: "#services" },
          { label: "工业搬运设备", url: "#services" },
        ],
      },
      {
        title: "核心产品",
        links: [
          { label: "全电动叉车", url: "#products" },
          { label: "前移式高位车", url: "#products" },
          { label: "手动液压车", url: "#products" },
          { label: "工业塑料托盘", url: "#products" },
          { label: "智能立体货架", url: "#products" },
        ],
      },
    ]
  }
}

// 1. KAMUS LABEL KONVERSI GOOGLE ADS UNTUK FOOTER (Disamakan dengan Label Hero WA)
const FOOTER_GADS_LABELS: Record<string, string> = {
  id: "8m9jCPu8sEceLCd9_xD",
  en: "8m9jCPu8sEceLCd9_xD",
  "zh-Hans": "8m9jCPu8sEceLCd9_xD",
}

interface FooterProps {
  locale?: string
}

export function Footer({ locale = "id" }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()

  const currentContent = CONTENT_DICTIONARY[locale] || CONTENT_DICTIONARY["id"]
  const isAtHomepage = pathname === `/${locale}` || pathname === `/${locale}/`

  // 2. FUNGSI UNTUK MENEMBAKKAN EVENT KONVERSI KE GOOGLE ADS
  const trackGadsConversion = () => {
    const currentLabel = FOOTER_GADS_LABELS[locale] || FOOTER_GADS_LABELS.id;
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `AW-18247175856/${currentLabel}`,
      });
    }
  };

  return (
    <footer className="bg-[#0a1424] text-slate-300 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Komponen Profil Perusahaan */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <Image 
                src="/images/logo.png" 
                alt="Key Lock ID" 
                width={120} 
                height={30} 
                priority // Mempercepat pemuatan logo
                className="h-auto w-5.5 md:w-6.5"
              />
              <span className="font-heading text-lg font-bold">
                Keylock<span className="text-amber-400"> Indonesia</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 text-justify">
              {currentContent.description}
            </p>
            <div className="mt-2 flex gap-3">
              {[Globe, Send, Share2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex size-9 items-center justify-center rounded-lg bg-white/5 text-slate-300 transition-colors hover:bg-amber-400 hover:text-navy"
                  aria-label="Social Link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Kolom Navigasi Dinamis Berdasarkan Bahasa */}
          {currentContent.navigation.map((col) => (
            <div key={col.title} className="lg:pl-6">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              {col.title}
            </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link: any) => {
                  const isAnchor = link.url.startsWith("#")
                  const finalHref = isAnchor && !isAtHomepage ? `/${locale}${link.url}` : link.url

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

          {/* Informasi Kontak Perusahaan */}
          <div>
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wider text-white">
              {currentContent.contactTitle}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li className="flex gap-2.5 text-justify">
                <MapPin className="size-4 shrink-0 text-amber-400 mt-0.5" />
                {COMMON_CONFIG.address}
              </li>
              <li className="flex gap-2.5 items-center">
                <Phone className="size-4 shrink-0 text-amber-400" />
                <a href={`tel:${COMMON_CONFIG.phone}`} className="hover:text-white transition-colors">{COMMON_CONFIG.phone}</a>
              </li>
              <li className="flex gap-2.5 items-center">
                <Mail className="size-4 shrink-0 text-amber-400" />
                <a href={`mailto:${COMMON_CONFIG.email}`} className="hover:text-white transition-colors">{COMMON_CONFIG.email}</a>
              </li>
            </ul>
            
            <div className="mt-5">
              {/* 3. MENAMBAHKAN ONCLICK DAN MEMPERBAIKI REL ATTRIBUTE */}
              <a
                href={`https://wa.me/${COMMON_CONFIG.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackGadsConversion}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-400"
              >
                <MessageCircle className="size-4" /> {currentContent.waLabel}
              </a>
            </div>
          </div>
        </div>

        {/* Peta Google Maps Tersemat */}
        {COMMON_CONFIG.google_maps_url && (
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="Lokasi Kantor Keylock"
              src={COMMON_CONFIG.google_maps_url}
              className="h-64 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}
      </div>

      {/* Bar Hak Cipta & Hak Paten */}
      <div className="border-t border-white/5 py-6 bg-[#070e1a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-500 sm:flex-row">
          <p>© {currentYear} {currentContent.copyright}</p>
          <p className="text-slate-300 tracking-wide text-center sm:text-right font-medium">{currentContent.keywords}</p>
        </div>
      </div>
    </footer>
  )
}