import { getHomepageData } from "@/lib/strapi"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Services } from "@/components/services"
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
  const resolvedParams = params instanceof Promise ? await params : params;
  const locale = resolvedParams?.locale || "id";

  const content = await getHomepageData(locale);

  // Guard Clause: Jika API Strapi bermasalah/error, tampilkan pesan fallback yang rapi
  if (!content) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 bg-background p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Koneksi CMS Bermasalah</h2>
        <p className="max-w-md text-sm text-steel">
          Gagal mengambil data dari Strapi. Pastikan server Strapi sudah aktif, token API benar, dan field data sudah di-publish.
        </p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      <Navbar locale={locale} />
      
      <Hero 
        data={content.hero_section} 
        locale={locale} 
      />
      
      <About data={content.about_section} />
      <Services data={content.service_section} />
      <WhyChooseUs data={content.advantages_section} />
      <ProductSection data={content.products_section} locale={locale} />
      <Process data={content.workflow_section} />
      <Testimonials data={content.testimonials_section} />
      <Coverage data={content.coverage_section} />
      <Faq data={content.faq_section} />
      <FinalCta data={content.cta_section} />
   
    </main>
  )
}