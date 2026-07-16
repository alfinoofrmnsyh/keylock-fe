"use client"

import { MessageSquare } from "lucide-react"

interface ProductWhatsAppButtonProps {
  whatsappUrl: string;
  locale: string;
  gadsLabel: string;
}

export function ProductWhatsAppButton({ whatsappUrl, locale, gadsLabel }: ProductWhatsAppButtonProps) {
  
  // Fungsi untuk mengirim event ke GTM (Agar konsisten dengan Hero & Footer)
  const trackGadsConversion = () => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      win.dataLayer.push({
        event: "product_conversion_event", 
        conversion_label: gadsLabel,    
      });
    }
  };

  return (
    <a 
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={trackGadsConversion}
      className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#0c1a30] p-4 text-white hover:bg-amber-500 font-bold transition-colors"
    >
      <MessageSquare className="size-5" />
      {locale === "en" ? "Request Quote" : locale === "zh-Hans" ? "获取报价" : "Minta Penawaran"}
    </a>
  )
}