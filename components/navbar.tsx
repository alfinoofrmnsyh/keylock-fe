"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, Globe, ChevronDown } from "lucide-react"

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

interface NavbarProps {
  locale?: string;
}

export function Navbar({ locale = "id" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [productsMobileOpen, setProductsMobileOpen] = useState(false)
  const [categories, setCategories] = useState<{ name: string; slug: string }[]>([])
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const pathname = usePathname()
  const router = useRouter()

  // Fetch data kategori dengan header bahasa yang aktif
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`, {
          headers: {
            'X-Locale': locale 
          }
        });
        
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    };

    fetchCategories();

    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [locale, API_URL]);

  const t = menuTranslations[locale] || menuTranslations.id
  const isAtHomepage = pathname === `/${locale}` || pathname === `/${locale}/`

  const links = [
    { label: t.home, href: `/${locale}`, isPage: true, isDropdown: false },
    { label: t.about, href: `/${locale}/about`, isPage: true, isDropdown: false },
    { label: t.services, href: isAtHomepage ? "#services" : `/${locale}#services`, isPage: false, isDropdown: false },
    { label: t.products, href: `/${locale}/products`, isPage: true, isDropdown: true },
    { label: t.coverage, href: isAtHomepage ? "#coverage" : `/${locale}#coverage`, isPage: false, isDropdown: false },
    { label: t.faq, href: isAtHomepage ? "#faq" : `/${locale}#faq`, isPage: false, isDropdown: false },
  ]

  const handleLanguageChange = (e: React.MouseEvent<HTMLAnchorElement>, newLocale: string) => {
    e.preventDefault()
    setLangOpen(false)
    setOpen(false)
    
    // Logic untuk mengganti locale di URL
    const segments = pathname.split("/")
    segments[1] = newLocale
    router.push(segments.join("/"))
  }

  // Helper styles
  const headerStyles = scrolled ? "glass-dark shadow-lg shadow-black/20" : isAtHomepage ? "bg-transparent" : "bg-white/80 backdrop-blur-md border-b border-slate-100"
  const textStyles = scrolled || isAtHomepage ? "text-slate-200 hover:text-amber-300" : "text-slate-600 hover:text-amber-500"
  const logoTextStyles = scrolled || isAtHomepage ? "text-white" : "text-[#0c1a30]"
  const buttonStyles = scrolled || isAtHomepage ? "border-white/20 bg-white/5 text-white hover:bg-white/10" : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${headerStyles}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <Link href={`/${locale}`} className={`flex items-center gap-2 ${logoTextStyles}`}>
          <img src="/images/logo.png" alt="Key Lock ID" className="h-5.5 w-auto" />
          <span className="font-heading text-lg font-bold tracking-tight">
            Keylock<span className="text-amber-400"> Indonesia</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const isActive = pathname.startsWith(l.href) && l.href !== `/${locale}`

            if (l.isDropdown) {
              return (
                <div key={l.label} className="relative group py-2">
                  <button className={`flex items-center gap-1 text-sm font-medium transition-colors focus:outline-none ${isActive ? "text-amber-400 font-semibold" : textStyles}`}>
                    <span>{l.label}</span>
                    <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  </button>

                  <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 pt-2 opacity-0 pointer-events-none invisible group-hover:opacity-100 group-hover:pointer-events-auto group-hover:visible transition-all duration-200">
                    <div className="rounded-xl border border-white/10 bg-[#0c1a30]/95 backdrop-blur-md p-1.5 shadow-xl text-left ring-1 ring-black/5">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/${locale}/products/${cat.slug}`}
                          className="block rounded-lg px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-amber-400 hover:text-[#0c1a30]"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            }

            return (
              <Link key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${pathname === l.href ? "text-amber-400 font-semibold" : textStyles}`}>
                {l.label}
              </Link>
            )
          })}
        </div>

        {/* Desktop CTA & Language Switcher */}
        <div className="hidden items-center gap-4 md:flex">
          <a href={isAtHomepage ? "#contact" : `/${locale}#contact`} className="inline-flex h-10 items-center justify-center rounded-lg bg-amber-400 px-5 text-sm font-semibold text-[#0c1a30] transition-colors hover:bg-amber-300">
            {t.cta}
          </a>
          <div className="relative">
            <button onClick={() => setLangOpen(!langOpen)} className={`flex h-10 items-center gap-1.5 rounded-lg border px-3 text-xs font-semibold transition-colors ${buttonStyles}`}>
              <Globe className="size-3.5 text-amber-400" />
              {locale.toUpperCase() === "ZH-HANS" ? "ZH" : locale.toUpperCase()}
              <ChevronDown className={`size-3 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-24 rounded-lg border border-white/10 bg-[#0c1a30]/95 backdrop-blur-md p-1 shadow-xl z-50">
                {availableLocales.map((loc) => (
                  <a key={loc.code} href={`/${loc.code}`} onClick={(e) => handleLanguageChange(e, loc.code)} className={`flex w-full items-center justify-center rounded-md px-2 py-1.5 text-xs font-medium transition-colors ${locale === loc.code ? "bg-amber-400 text-[#0c1a30]" : "text-slate-300 hover:bg-white/10"}`}>
                    {loc.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button className={`md:hidden p-2 rounded-lg ${scrolled || isAtHomepage ? "text-white" : "text-slate-800"}`} onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile Menu Content */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-[#0c1a30] text-white shadow-xl min-h-screen p-6">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              l.isDropdown ? (
                <div key={l.label}>
                  <button onClick={() => setProductsMobileOpen(!productsMobileOpen)} className="flex w-full items-center justify-between text-lg font-medium py-2 text-left">
                    {l.label}
                    <ChevronDown className={`size-5 transition-transform ${productsMobileOpen ? "rotate-180" : ""}`} />
                  </button>
                  {productsMobileOpen && (
                    <div className="flex flex-col gap-2 pl-4 pt-2 border-l border-white/20">
                      {categories.map((cat) => (
                        <Link key={cat.slug} href={`/${locale}/products/${cat.slug}`} onClick={() => setOpen(false)} className="text-slate-400 hover:text-amber-400 py-1 text-sm">
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-lg font-medium py-2 block">
                  {l.label}
                </Link>
              )
            ))}

            {/* BARU: Pembatas, Tombol CTA Seluler, & Pemilih Bahasa */}
            <div className="mt-6 border-t border-white/10 pt-6 flex flex-col gap-6">
              {/* Tombol CTA */}
              <a 
                href={isAtHomepage ? "#contact" : `/${locale}#contact`} 
                onClick={() => setOpen(false)}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-amber-400 text-base font-semibold text-[#0c1a30] transition-colors hover:bg-amber-300"
              >
                {t.cta}
              </a>

              {/* Pemilih Bahasa */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  <Globe className="size-3.5 text-amber-400" />
                  <span>Pilih Bahasa / Language</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {availableLocales.map((loc) => (
                    <a 
                      key={loc.code} 
                      href={`/${loc.code}`} 
                      onClick={(e) => handleLanguageChange(e, loc.code)} 
                      className={`flex items-center justify-center rounded-lg py-2.5 text-sm font-medium transition-colors ${
                        locale === loc.code 
                          ? "bg-amber-400 text-[#0c1a30]" 
                          : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      {loc.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </header>
  )
}