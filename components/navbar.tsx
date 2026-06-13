"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, Truck, Globe, ChevronDown } from "lucide-react"

const menuTranslations: Record<string, { home: string; about: string; services: string; products: string; coverage: string; faq: string; cta: string }> = {
  id: { home: "Beranda", about: "Tentang Kami", services: "Layanan", products: "Produk", coverage: "Cakupan", faq: "FAQ", cta: "Minta Penawaran" },
  en: { home: "Home", about: "About", services: "Services", products: "Products", coverage: "Coverage", faq: "FAQ", cta: "Request Quotation" },
  "zh-Hans": { home: "首页", about: "关于我们", services: "全方位服务", products: "系列产品", coverage: "服务范围", faq: "常见问题", cta: "索取价格" }
}

const availableLocales = [
  { code: "id", label: "ID" },
  { code: "en", label: "EN" },
  { code: "zh-Hans", label: "ZH" }
]

// List 5 Kategori Produk sesuai permintaan
const PRODUCT_CATEGORIES = [
  { title: "Plastic Pallet", slug: "plastic-pallet" },
  { title: "Storage Racks & Truck Scale", slug: "storage-racks-truck-scale" },
  { title: "Forklift", slug: "forklift" },
  { title: "Industrial Fan", slug: "industrial-fan" },
  { title: "Industrial Tools & Equipment", slug: "industrial-tools-equipment" },
]

interface NavbarProps {
  locale?: string;
}

export function Navbar({ locale = "id" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [productsMobileOpen, setProductsMobileOpen] = useState(false) // State dropdown mobile
  
  const pathname = usePathname()
  const router = useRouter()

  const t = menuTranslations[locale] || menuTranslations.id
  const isAtHomepage = pathname === `/${locale}` || pathname === `/${locale}/`

  const links = [
    { label: t.home, href: `/${locale}`, isPage: true, isDropdown: false },
    { label: t.about, href: `/${locale}/about`, isPage: true, isDropdown: false },
    { label: t.services, href: isAtHomepage ? "#services" : `/${locale}#services`, isPage: false, isDropdown: false },
    { label: t.products, href: `/${locale}/products`, isPage: true, isDropdown: true }, // Diubah menjadi root page / rujukan dropdown
    { label: t.coverage, href: isAtHomepage ? "#coverage" : `/${locale}#coverage`, isPage: false, isDropdown: false },
    { label: t.faq, href: isAtHomepage ? "#faq" : `/${locale}#faq`, isPage: false, isDropdown: false },
  ]

  const handleLanguageChange = (e: React.MouseEvent<HTMLAnchorElement>, newLocale: string) => {
    e.preventDefault()
    setLangOpen(false)
    setOpen(false)
    
    const segments = pathname.split("/")
    segments[1] = newLocale
    const newPath = segments.join("/")
    router.push(newPath)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const headerStyles = scrolled
    ? "glass-dark shadow-lg shadow-black/20"
    : isAtHomepage
    ? "bg-transparent"
    : "bg-white/80 backdrop-blur-md border-b border-slate-100"

  const textStyles = scrolled || isAtHomepage
    ? "text-slate-200 hover:text-amber-300"
    : "text-slate-600 hover:text-amber-500"

  const logoTextStyles = scrolled || isAtHomepage
    ? "text-white"
    : "text-[#0c1a30]"

  const buttonStyles = scrolled || isAtHomepage
    ? "border-white/20 bg-white/5 text-white hover:bg-white/10"
    : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerStyles}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* LOGO BRAND */}
        <Link href={`/${locale}`} className={`flex items-center gap-2 ${logoTextStyles}`}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-amber-400">
            <Truck className="size-5 text-[#0c1a30]" />
          </span>
          <span className="font-heading text-lg font-bold tracking-tight">
            Keylock<span className="text-amber-400"> ID</span>
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = pathname.startsWith(l.href) && l.href !== `/${locale}`

            // Render khusus untuk menu Products yang mempunyai Dropdown Kategori
            if (l.isDropdown) {
              return (
                <div key={l.label} className="relative group py-2">
                  <button className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${isActive ? "text-amber-400 font-semibold" : textStyles}`}>
                    <span>{l.label}</span>
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Box Menu Container */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 opacity-0 pointer-events-none invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-all duration-200">
                    <div className="rounded-xl border border-white/10 bg-[#0c1a30]/95 backdrop-blur-md p-1.5 shadow-xl text-left ring-1 ring-black/5">
                      {PRODUCT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${locale}/products/${cat.slug}`}
                          className="block rounded-lg px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-amber-400 hover:text-[#0c1a30]"
                        >
                          {cat.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            if (!l.isPage) {
              return (
                <a 
                  key={l.href} 
                  href={l.href} 
                  className={`text-sm font-medium transition-colors ${textStyles}`}
                >
                  {l.label}
                </a>
              )
            }

            return (
              <Link 
                key={l.href} 
                href={l.href} 
                className={`text-sm font-medium transition-colors ${pathname === l.href ? "text-amber-400 font-semibold" : textStyles}`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-4 md:flex">
          <a 
            href={isAtHomepage ? "#contact" : `/${locale}#contact`} 
            className="inline-flex h-10 items-center justify-center rounded-lg bg-amber-400 px-5 text-sm font-semibold text-[#0c1a30] transition-colors hover:bg-amber-300"
          >
            {t.cta}
          </a>

          {/* Selector Bahasa Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setLangOpen(!langOpen)} 
              className={`flex h-10 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${buttonStyles}`}
            >
              <Globe className="size-3.5 text-amber-400" />
              {locale.toUpperCase() === "ZH-HANS" ? "ZH" : locale.toUpperCase()}
              <ChevronDown className={`size-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 rounded-lg border border-white/10 bg-[#0c1a30]/95 backdrop-blur-md p-1 shadow-xl z-50">
                {availableLocales.map((loc) => (
                  <a 
                    key={loc.code} 
                    href={`/${loc.code}`} 
                    onClick={(e) => handleLanguageChange(e, loc.code)}
                    className={`flex w-full items-center justify-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${locale === loc.code ? "bg-amber-400 text-[#0c1a30]" : "text-slate-300 hover:bg-white/10"}`}
                  >
                    {loc.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* MOBILE TRIGGER BUTTON */}
        <button className={`md:hidden ${scrolled || isAtHomepage ? "text-white" : "text-slate-800"}`} onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* MOBILE DRAWER */}
      {open && (
        <div className="border-t border-white/10 md:hidden bg-[#0c1a30]/95 backdrop-blur-md shadow-xl">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => {
              const isActive = pathname === l.href
              
              if (l.isDropdown) {
                return (
                  <div key={l.label} className="w-full">
                    <button 
                      onClick={() => setProductsMobileOpen(!productsMobileOpen)}
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                    >
                      <span>{l.label}</span>
                      <ChevronDown className={`size-4 transition-transform ${productsMobileOpen ? "rotate-180 text-amber-400" : ""}`} />
                    </button>
                    
                    {/* Sub-menu kategori untuk mobile */}
                    {productsMobileOpen && (
                      <div className="mt-1 ml-4 pl-2 border-l border-white/10 flex flex-col gap-1">
                        {PRODUCT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/${locale}/products/${cat.slug}`}
                            onClick={() => setOpen(false)}
                            className="rounded-lg px-3 py-2 text-xs font-medium text-slate-400 hover:text-amber-400 hover:bg-white/5"
                          >
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }

              if (!l.isPage) {
                return (
                  <a 
                    key={l.href} 
                    href={l.href} 
                    onClick={() => setOpen(false)} 
                    className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                  >
                    {l.label}
                  </a>
                )
              }

              return (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  onClick={() => setOpen(false)} 
                  className={`rounded-lg px-3 py-2 text-sm font-medium ${isActive ? "bg-white/10 text-amber-400" : "text-slate-200 hover:bg-white/10"}`}
                >
                  {l.label}
                </Link>
              )
            })}
            
            <a 
              href={isAtHomepage ? "#contact" : `/${locale}#contact`} 
              onClick={() => setOpen(false)} 
              className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-amber-400 px-5 text-sm font-semibold text-[#0c1a30] hover:bg-amber-300"
            >
              {t.cta}
            </a>
            
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around">
              {availableLocales.map((loc) => (
                <a 
                  key={loc.code} 
                  href={`/${loc.code}`} 
                  onClick={(e) => handleLanguageChange(e, loc.code)}
                  className={`px-3 py-1 rounded text-xs font-bold ${locale === loc.code ? "bg-amber-400 text-[#0c1a30]" : "text-slate-400"}`}
                >
                  {loc.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}