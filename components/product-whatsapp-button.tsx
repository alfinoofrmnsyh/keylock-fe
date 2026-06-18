"use client"

import { MessageSquare } from "lucide-react"

interface ProductWhatsAppButtonProps {
  whatsappUrl: string;
  locale: string;
  gadsLabel: string;
}

export function ProductWhatsAppButton({ whatsappUrl, locale, gadsLabel }: ProductWhatsAppButtonProps) {
  
  // Fungsi pelacakan konversi Google Ads ketika tombol diklik
  const trackGadsConversion = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "conversion", {
        send_to: `AW-18247175856/${gadsLabel}`,
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