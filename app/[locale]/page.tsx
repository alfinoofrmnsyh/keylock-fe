import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
import {LogoCarousel} from "@/components/logocarousel"
import { WhyChooseUs } from "@/components/why-choose-us"
import { ProductSection } from "@/components/product-section"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { Coverage } from "@/components/coverage"
import { Faq } from "@/components/faq"
import { FinalCta } from "@/components/final-cta"

type PageProps = {
  params: any
}

export default async function Page({ params }: PageProps) {
  // Mempertahankan logika resolve params bawaan Anda agar aman di Next.js versi terbaru
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams?.locale || "id";

  return (
    <main className="overflow-x-hidden">
      <Navbar locale={locale} />
      <Hero locale={locale} />
      <About locale={locale} />
      <LogoCarousel locale={locale} />
      <Services locale={locale} />
      <WhyChooseUs locale={locale} />
      <ProductSection locale={locale} />
      <Process locale={locale} />
      <Testimonials locale={locale} />
      <Coverage locale={locale} />
      <Faq locale={locale} />
      <FinalCta locale={locale} />
   
    </main>
  )
}