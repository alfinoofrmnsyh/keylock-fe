"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// 1. Definisi Tipe Data
interface Partner {
  id: number;
  name: string;
  image_url: string;
}

interface LogoCarouselProps {
  locale?: string;
}

// 2. Dictionary untuk Multibahasa
const LABELS: Record<string, string> = {
  id: "Klien Kami",
  en: "Our Clients",
  "zh-Hans": "我们的客户",
};

export function LogoCarousel({ locale = "id" }: LogoCarouselProps) {
  const [logos, setLogos] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetching Data
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partners`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const data = await res.json();
        setLogos(data);
      } catch (error) {
        console.error("Error fetching logos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLogos();
  }, []);

  // Jangan tampilkan apa pun jika data belum ada atau kosong
  if (isLoading || logos.length === 0) return null;

  // Tentukan judul berdasarkan locale
  const title = LABELS[locale] || LABELS.id;

  return (
    <div className="w-full overflow-hidden bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        <h3 className="mb-10 text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-800">
          {title}
        </h3>

        <div className="relative flex overflow-hidden">
          {/* Efek Infinite Scroll */}
          <motion.div
            className="flex gap-12 md:gap-20 items-center"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {/* Duplikasi data untuk memastikan loop mulus */}
            {[...logos, ...logos].map((logo, index) => (
              <div 
                key={`${logo.id}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/storage/${logo.image_url}`}
                  alt={logo.name}
                  width={140}
                  height={70}
                  className="h-12 md:h-16 w-auto object-contain grayscale opacity-60 transition-all hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}